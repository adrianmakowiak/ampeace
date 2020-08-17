def lambda_wrapper(func):
  def wrapper(*args, **kwargs):
    try:
      return func(*args, **kwargs)
    except Exception as e:
      print(e)
      return {
        "statusCode":500,
        "body":str(e)
      }
  return wrapper

