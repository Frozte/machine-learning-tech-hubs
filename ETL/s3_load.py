import pandas as pd
import requests
import boto3
from botocore.exceptions import NoCredentialsError
from io import StringIO
import os

from dotenv import load_dotenv
load_dotenv()

def create_url(base_url, tables, geo):
    return f"{base_url}?get={tables}&for={geo}"

def census_api_df(year, dataset,tables):
    HOST = "https://api.census.gov/data"
    
    base_url = "/".join([HOST, year, dataset])
    

    table_str = ",".join(tables.keys())
    geo = "zip%20code%20tabulation%20area:*"

    url = create_url(base_url,table_str,geo)
    r = requests.get(url)

    # Create a list of human-readable text
    col_names = list(tables.values())
    col_names.append("Zip Code")

    return pd.DataFrame(columns = col_names, data = r.json()[1:])

def s3_upload(df):
    ACCESS_KEY = os.getenv("AWSAccessKeyId")
    SECRET_KEY = os.getenv("AWSSecretKey")
    BUCKET_NAME = "tech-hub-ml"
    RAW_FILE_NAME = "raw-census.csv"

    # write DF to string stream
    csv_buffer = StringIO()
    df.to_csv(csv_buffer, index=False)

    s3 =  boto3.resource(
                's3', 
                aws_access_key_id = ACCESS_KEY,
                aws_secret_access_key = SECRET_KEY,
            )

    try:
        s3.Object(BUCKET_NAME, RAW_FILE_NAME).put(Body = csv_buffer.getvalue())
        print("Upload Successful")
    except FileNotFoundError: 
        print("The file was not found")
    except NoCredentialsError:
        print("Credentials not available")

