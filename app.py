# We import Flask
from flask import Flask, request, render_template, jsonify
from pymongo import MongoClient
from connections import readMongoCloud
import pickle
import pandas as pd
import numpy as np
import os
import requests
import json

# We create a Flask app and deserialize the machine learning model 
app = Flask(__name__)
model = pickle.load(open('models/model.pickle', 'rb'))

# We establish a Flask route so that we can serve HTTP traffic on that route 
@app.route('/')
def home():
    # We hardcode some information to be returned
    return render_template('index.html')

# App route to run our machine learning predictions
@app.route('/predict',methods=['POST'])
def predict():

    zipcode = [str(x) for x in request.form.values()]


    ## Code to call all the feature values for the requested zip code
    df = pd.read_csv("https://tech-hub-ml.s3.amazonaws.com/master.csv", encoding="ISO-8859-1", converters={'Zip Code': lambda x: str(x)})

    print(df.head())
    if zipcode[0] in list(df["Zip Code"]):
        features = df.loc[df['Zip Code'] == zipcode[0]].values[0]
        city = features[3]
        state = features[2]
        final_features = np.delete(features,[0,1,2,3,4])

        prediction = model.predict([final_features])

        if prediction == '1':
            output = "Yes"
        else:
            output = "No"

        # results = [f"Move your next start up here? {output}!", f"{city}, {state} {zipcode[0]}", f"Average Real Estate: ${final_features[0]}",f"Income per capita: ${final_features[1]}",f"Percentage of Population with Bachelors: {round(100*final_features[4],2)}%", f"Percentage of population that use public transportation: {round(100*final_features[5],2)}%", f"Median Age Female: {final_features[2]}", f"Median Age Male: {final_features[3]}"] 
        results = [f"{output}!", f"{city}, {state} {zipcode[0]}", f"${final_features[0]}",f"${final_features[1]}",f"{round(100*final_features[4],2)}%", f"{round(100*final_features[5],2)}%", f"{final_features[2]}", f"{final_features[3]}"] 
    else:
        results = ["Invalid zip code. Try again."]

    #LAT/LNG FINDER
    zipurl = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:"+zipcode[0]+"|country:US&key=AIzaSyCXHiDgN9t3DXorh6zgafpCdv-_Jop4HLs" 
    
    response=requests.get(zipurl)
    Jresponse = response.text
    data=json.loads(Jresponse)

    LAT = data['results'][0]['geometry']['location']['lat']
    LNG = data['results'][0]['geometry']['location']['lng']

    ziptocoords = [LAT,LNG]  

    return render_template('ML.html', scroll='middle', prediction_text = results, coordinates = ziptocoords)

@app.route('/ML')
def ML():
    # We hardcode some information to be returned
    return render_template('ML.html')

@app.route('/map')
def map():
    # We hardcode some information to be returned
    return render_template('map.html')

@app.route('/team')
def team():
    # We hardcode some information to be returned
    return render_template('team.html')

@app.route('/blog')
def blog():
    # We hardcode some information to be returned
    return render_template('blog.html')
	
@app.route('/techjobs')
def jobs():
    # We hardcode some information to be returned
    return render_template('jobs.html')

@app.route("/readData")
def read():
    # Replace arguments with the name of your database and collection on mongodb
    db_df = readMongoCloud("bls","tech_jobs")
    return jsonify(db_df.to_dict('records'))

# Get setup so that if we call the app directly (and it isn't being imported elsewhere)
# it will then run the app with the debug mode as True
# More info - https://docs.python.org/3/library/__main__.html
if __name__ == '__main__':
    app.run(debug=True)