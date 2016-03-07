from Adafruit_BME280 import *
import time

sensor = BME280(mode=BME280_OSAMPLE_8)

#while(True):
deg_C = sensor.read_temperature();
pressure_Pa = sensor.read_pressure();
hPa = pressure_Pa/100;
humidity_perc = sensor.read_humidity();

print 'Timestamp = {0:0.3f}'.format(sensor.t_fine)
print 'Temp      = {0:0.3f} deg C'.format(deg_C)
print 'Pressure  = {0:0.2f} hPa'.format(hPa)
print 'Humidity  = {0:0.2f} %'.format(humidity_perc)

#    time.sleep(2.0);
