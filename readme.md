<h1>nextTech - Find Your Next Start Up City Here</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
  <a href="1" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://opensource.org/licenses/MIT" target="_blank">
    <img alt="License: MIT--License" src="https://img.shields.io/badge/License-MIT--License-yellow.svg" />
  </a>
</p>

>An interactive way for users to observe trends in major tech hub cities
***

## ✨ [Visit the Website Here](https://tech-hub-predictor.herokuapp.com/)

![](static/img/1.PNG)


<!-- <p>
  <img src="https://raw.githubusercontent.com/joshuajonme/machine-learning-tech-hubs/main/2.PNG" alt="demo"/>
</p>

<p>
  <img src="https://raw.githubusercontent.com/joshuajonme/machine-learning-tech-hubs/main/3.PNG" alt="demo"/>
</p> -->

***
## ✔️ Prerequisites

Assuming you have the basics set up, please proceed to pip install the following to your local or virtual environment

```sh
pip install flask pymongo pandas python-dotenv dnspython sklearn requests
```
NOTE: Our env file is not included as it is related to our individual Mongo database

Version for these prerequisites include...

```sh
dnspython==2.0.0
Flask==1.1.2
pandas==1.1.5
pymongo==3.11.2
python-dotenv==0.15.0
scikit-learn==0.23.2
sklearn==0.0
requests==2.24.0
```
***

## 🖥️ Usage

Completing the above, proceed to run the code by 

```sh
python app.py
```
---
## 🚧 Project Outline
Our group set out to develop a machine learning model that can predict whether a zip code is a tech hub or not. 

Data Sources
----------------

-   [Census report
    API](https://github.com/censusreporter/census-api/blob/master/API.md) (Age,
    education, ethnic group, median salary) 

-   [Zillow API](https://www.zillow.com/howto/api/APIOverview.htm) (Real estate
    data)


Gathering data
--------------

Our objective was to find usable data from the data sources listed above and
make readable in a JSON format to work with our JavaScript visualization
libraries. Our approach starts with identify the level of detail for location
(city, neighborhood, zip codes, etc.) that is consistent across our data
sources. Web APIs will then be used to pull data for NYC regions to feed into an
unsupervised learning model.

 

Data Wrangling
-----------------

Used Pandas for ETL. Cleaned the data, and gathered the specific features that we wanted. Merged the census and zillow dataframes, using zip code as our key. 

 

Machine Learning
-----------------

Unsupervised k-mean machine learning

1.  Created five clusters, using the elbow method, to define the parameters of a tech hub.
    This served as our training set.

2.  Analyzed each cluster to determine which cluster we would use to determine tech hub   viability.

3.  Created a new column to identify the zip codes as a tech hub or not.

Supervised logistic regression machine learning:

1.  Split data into training and testing sets.

2.  Trained a logistical regression model based on outputs defined from our
    unsupervised machine learning model.

3.  Used this model to predict which locations across the US are tech hubs

4.  Exported trained logistical model through pickle in order to run our model through flask application

 

Data Loading
------------

From here, all the data was loaded in an AWS database by creating an S3 bucket. This allows for our data to be stored remotely, which allows for anybody to run our model without needing to download all the data locally. 

Then, using a provided API which we used on our Flask app 



***
## 📖 Authors

👤 **Deep Patel**

* Website: www.mrdeeppatel.com
* Github: [@Frozte](https://github.com/Frozte)
* LinkedIn: [@Deep Patel](https://linkedin.com/in/deep-patel-79082494)

👤 **Joshua Coronel**

* Github: [@joshuajonme](https://github.com/joshuajonme)
* LinkedIn: [@Joshua Coronel](https://www.linkedin.com/in/joshuacoronel/)

👤 **Keana Mabilog**

* Github: [@keana-m](https://github.com/keana-m)
* LinkedIn: [@Keana Mabilog](https://www.linkedin.com/in/keana-m/)

👤 **Stephano Castro**

* Github: [@castrostephano](https://github.com/castrostephano)
* LinkedIn: [@Stephano Castro](https://www.linkedin.com/in/stephanocastro/)

***
## 👌 Show your support

Give a ⭐️ if this project helped you!
***
## 📝 License

Copyright © 2020 [Deep Patel](https://github.com/Frozte), [Joshua Coronel](https://github.com/joshuajonme), [Keana Mabilog](https://github.com/keana-m) & [Stephano Castro](https://github.com/castrostephano).<br />
This project is [MIT](https://github.com/Frozte/AmazonWebScraper/blob/main/LICENSE) licensed.

***
_This README was generated with [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_