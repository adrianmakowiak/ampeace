import json
import base64
import boto3
from wrapper import lambda_wrapper

s3 = boto3.client('s3')

@lambda_wrapper
def hello(event, context):
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

