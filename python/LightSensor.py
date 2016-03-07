from pymongo import MongoClient
import datetime
import RPi.GPIO as GPIO
import time

def GetMongoConnection():
    con = None;
    try:
        con = MongoClient('mongodb://RPi:dragonpi@192.168.20.2:27017');
    except (AttributeError, pymongo.errors.OperationFailure):
        print "Could not connect to server: %s" % AttributeError
    return con

mongoClient = GetMongoConnection();
if mongoClient is None:
    quit()
else:
    print "Successfully got MongoDb client";

db = mongoClient.weather;
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
    return 1.0 - ((float)(counter)/(float)(MAX_COUNT));

while True:
    timestamp = datetime.datetime.utcnow().isoformat() + "Z";
    curLightLevel = AnalogInput(PIN);
    
    print "Timestamp: %s" % timestamp;
    print "Light Level: %s" % curLightLevel;
    
    post = {
        'timeStamp': timestamp,
        'lightLevel': curLightLevel,
        'temperature': 0,
        'pressure': 0,
        'humidity': 0,
        'windSpeed': 0,
        'windDirection': 0
    };
    
    weatherData.insert_one(post);

    time.sleep(1.0);

