import json
import base64
import boto3
import botocore
from uuid import uuid4
#pylint: disable=import-error
from src.wrapper.wrapper import lambda_wrapper
from src.models.sound_table import SoundTable
from src.lambdas.lambda_responses import HttpOkJSONResponse, HttpCreatedJSONResponse, HttpOkFileResponse
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
    sound_key = event['pathParameters']['id'] + '.mp3'
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
