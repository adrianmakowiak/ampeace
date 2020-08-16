import json
import base64
import boto3
from uuid import uuid4
#pylint: disable=import-error
from src.wrapper.wrapper import lambda_wrapper
#pylint: enable=import-error


def respond(err, res=None):
    return {
        "statusCode": "400" if err else "200",
        "body": err["message"] if err else json.dumps(res),
        "headers": {"Content-Type": "application/json"},
    }


s3 = boto3.client('s3')
dynamo = boto3.client('dynamodb')

@lambda_wrapper
def get(event, context):
    print(boto3)
    response = s3.get_object(Bucket='ampeace-sounds', Key='mdi-fire.mp3')
    print(response)

    audio = response['Body'].read()

    response = {
        'statusCode': 200,
        'body': base64.b64encode(audio),
        'headers': {
            "Content-Type": "audio/mpeg"
        },
        'isBase64Encoded': True
    }

    return response

@lambda_wrapper
def post(event, context):
    print('post')
    sound_key = uuid4()
    print(sound_key)
    print(str(sound_key).join('.mp3'))
    file_content = base64.b64decode(event['body'])
    s3_response = s3.put_object(
        Body=file_content, 
        Bucket='ampeace-sounds', 
        Key=str(sound_key)+'.mp3', ContentType='audio/mp3'
        )

    print(s3_response)

    response = {
        'statusCode': 200,
        'body': json.dumps(event)
    }

    return response

