import sys
import os
import pandas as pd
import csv
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

# Access environment variables
username = os.getenv("jc_mongo_username")
password = os.getenv("jc_mongo_password")

#cloud mongo connect
cloudMClnt = MongoClient()
cloudMClnt = MongoClient("mongodb+srv://" + username + ":" + password + "@techdata.hvqxz.mongodb.net/<dbname>?retryWrites=true&w=majority")

def cloud_collection(database, collection):
    # Read mongo database 
    db = cloudMClnt[database]
    # Read mongo collection
    return db[collection]

# Run to load data into the mongodb cloud
def load_csv(filename,database,collection):
    # Set collection to load data into 
    db_c = cloud_collection(database,collection)

    # Read CSV to pandas dataframe
    db_df = pd.read_csv(filename, header=0)

    # Convert pandas dataframe to json
    json_data = db_df.to_dict('records')

    # Load csv into mongo collection
    db_c.insert_many(json_data)


def readMongoCloud(database,collection):
    # Load cloud collection from cloud
    db_c = cloud_collection(database,collection)

    # Read collection to a pandas dataframe
    db_df = pd.DataFrame(db_c.find().sort([
        ('ID',1)
    ]))

    del db_df['_id']
    return db_df

# # Run to load data
#load_csv('static/data/tech_job_data/techjobs.csv',"techjobs", "techjobs")