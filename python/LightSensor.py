from pymongo import MongoClient
import datetime
import RPi.GPIO as GPIO
import time

client = MongoClient('mongodb://localhost/weather');
db = client.weather;
weatherData = db.weatherdatas;

PIN = 18;
MAX_COUNT = 1e5;

GPIO.setmode(GPIO.BCM);

def AnalogInput(pin):
    counter = 0;
    GPIO.setup(pin, GPIO.OUT);
    GPIO.output(pin, GPIO.LOW);
    time.sleep(0.1);
    GPIO.setup(pin, GPIO.IN);
    while(GPIO.input(pin)==GPIO.LOW):
        counter = counter + 1.0;
        if counter > MAX_COUNT:
            break;
    return 1.0 - ((float)counter/(float)MAX_COUNT);

while True:
    post = {
        'timeStamp': datetime.datetime.utcnow().isoformat() + "Z",
        'lightLevel': AnalogInput(PIN),
        'temperature': 0,
        'pressure': 0,
        'humidity': 0,
        'windSpeed': 0,
        'windDirection': 'N'
    };
    
    weatherData.insert_one(post);

    time.sleep(1.0);

