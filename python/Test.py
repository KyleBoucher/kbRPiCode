from pymongo import MongoClient
import datetime
import random


client = MongoClient('mongodb://localhost/weather');
db = client.weather;
weatherData = db.weatherdatas;

post = {
    'timeStamp': datetime.datetime.utcnow().isoformat() + "Z",
    'lightLevel': random.random(),
    'temperature': 0,
    'pressure': 0,
    'humidity': 0,
    'windSpeed': 0,
    'windDirection': 'N'
};


weatherData.insert_one(post);

for d in weatherData.find():
    print d;