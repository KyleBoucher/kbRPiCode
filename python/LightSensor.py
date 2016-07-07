from pymongo import MongoClient
from Adafruit_BME280 import *
import datetime
import RPi.GPIO as GPIO
import time
import os

############### MONGO 
def GetMongoConnection():
    con = None;
    try:
        #con = MongoClient('mongodb://RPi:dragonpi@192.168.20.2:27017');
        #con = MongoClient('mongodb://RPi:dragonpi@localhost:27017');
        con = MongoClient('mongodb://RPi:dragonpi@localhost')
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

############### Light Sensor
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

############### BME280
bmeSensor = BME280(mode=BME280_OSAMPLE_8)


while True:
    ## Timestamp
    timestamp = datetime.datetime.utcnow().isoformat() + "Z";
    
    ## Light
    curLightLevel = AnalogInput(PIN);
    
    ## BME
    deg_C = bmeSensor.read_temperature();
    pressure_Pa = bmeSensor.read_pressure();
    hPa = pressure_Pa/100;
    humidity_perc = bmeSensor.read_humidity();
    
    ## Output
    os.system('clear')
    print '-----------------------------'
    print 'Timestamp    = {0}'.format(timestamp)
    print "Light Level  = {0:0.3f}".format(curLightLevel);
    print 'Temp         = {0:0.3f} deg C'.format(deg_C)
    print 'Pressure     = {0:0.2f} hPa'.format(hPa)
    print 'Humidity     = {0:0.2f} %'.format(humidity_perc)
    
    post = {
        'timeStamp': timestamp,
        'lightLevel': curLightLevel,
        'temperature': deg_C,
        'pressure': hPa,
        'humidity': humidity_perc,
        'windSpeed': 0,
        'windDirection': 0
    };
    
    weatherData.insert_one(post);

    time.sleep(600.0);

