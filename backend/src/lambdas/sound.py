import json
import base64
import boto3
import botocore
from uuid import uuid4
#pylint: disable=import-error
from src.wrapper.wrapper import lambda_wrapper
from src.models.sound_table import SoundTable
from src.lambdas.lambda_responses import HttpOkJSONResponse, HttpCreatedJSONResponse, HttpOkFileResponse, HttpNoContentResponse
#pylint: enable=import-error

BUCKET_NAME = 'ampeace-sounds'

s3 = boto3.client('s3')

@lambda_wrapper
def list(event, context):
    sounds = SoundTable.query('sound')
    items = {'items': [dict(sound) for sound in sounds]}
    return HttpOkJSONResponse(body=items).__dict__()

@lambda_wrapper
def get(event, context):
    print('get')
    sound_key = event['pathParameters']['id'] + '/sound.mp3'
    try:
        s3_response = s3.get_object(Bucket=BUCKET_NAME, Key=sound_key)
    except botocore.exceptions.ClientError as error:
        if error.response['Error']['Code'] == 'NoSuchKey':
            return {
                'statusCode': 404
            }
        else:
            raise Exception(str(error))

    audio = s3_response['Body'].read()

    return HttpOkFileResponse(file=audio, file_type='audio/mpeg').__dict__()

@lambda_wrapper
def post(event, context):
    sound_name = event['queryStringParameters']['name']
    sound_key = str(uuid4())
    file_content = base64.b64decode(event['body'])
    s3_response = s3.put_object(
        Body=file_content, 
        Bucket=BUCKET_NAME,
        Key=sound_key+'.mp3', ContentType='audio/mp3'
        )
    print(s3_response)

    sound_item = SoundTable(PK='sound', SK=sound_key, sound_type='mp3', sound_name=sound_name)
    sound_item.save()

    return HttpCreatedJSONResponse(body={'soundId': sound_key}).__dict__()

@lambda_wrapper
def pre_upload(event, context):
    sound_name = event['queryStringParameters']['name']
    sound_id = str(uuid4())
    upload_url_icon = s3.generate_presigned_post(
        Bucket=BUCKET_NAME,
        Key=sound_id  + '/icon.svg', 
        Fields={
            "x-amz-meta-name": sound_name
        },
        Conditions=[
            {"x-amz-meta-name": sound_name},
            ["content-length-range", 0, 5000]
        ], 
        ExpiresIn=3600)
    upload_url_sound = s3.generate_presigned_post(
        Bucket=BUCKET_NAME, 
        Key=sound_id + '/sound.mp3', 
        Fields={
            "x-amz-meta-name": sound_name
        }, 
        Conditions=[
            {"x-amz-meta-name": sound_name},
            ["content-length-range", 0, 5000000]
        ], 
        ExpiresIn=3600)
    print(upload_url_icon)
    print(upload_url_sound)
    response = {
        'upload_url_icon': upload_url_icon,
        'upload_url_sound': upload_url_sound
    }

    return HttpOkJSONResponse(body=response).__dict__()

@lambda_wrapper
def s3_upload_trigger(event, context):
    file_key = event['Records'][0]['s3']['object']['key']
    file_object_head = s3.head_object(Bucket=BUCKET_NAME, Key=file_key)
    print(file_object_head)
    sound_id, sound_type = file_key.split('/')
    sound_item = SoundTable(PK='sound', SK=sound_id, sound_type=sound_type.split('.')[1], sound_name='sound_name')
    sound_item.save()

    return HttpNoContentResponse().__dict__()
