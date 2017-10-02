/*
    Arduino thermistor
    Copyright (c) 2010 Mark McComb, hacktronics LLC
    License: http://www.opensource.org/licenses/mit-license.php (Go crazy)
*/
#include <math.h>
#include <SoftwareSerial.h>

long idNumber;
SoftwareSerial XBee(2,3);
int tempRead = A0;
const int sensorPin = A0;
int sensorMin = 0;
int sensorMax = 1023;
int sensorValue = 0;


void setup(void) {
  Serial.begin(9600);
  XBee.begin(9600);
  pinMode(A0, INPUT);
  randomSeed(analogRead(1));
  idNumber = 2;

  while (millis() < 5000) {
    sensorValue = analogRead(sensorPin);
    if (sensorValue > sensorMax) {
      sensorMax = sensorValue;
    }
    else if (sensorValue < sensorMin) {
      sensorMin = sensorValue;
    }
  }
}

double Thermister(int RawADC) {
  double Temp;
  // See http://en.wikipedia.org/wiki/Thermistor for explanation of formula
  Temp = log(((10240000/RawADC) - 10000));
  //Serial.print(RawADC);
  Temp = 1 / (0.001129148 + (0.000234125 * Temp) + (0.0000000876741 * Temp * Temp * Temp));
  Temp = Temp - 273.15;           // Convert Kelvin to Fahrenheit
  return Temp;
}

void tempnum() {
  double ftemp;
  sensorValue = analogRead(sensorPin);
  sensorValue = map(sensorValue, sensorMin, sensorMax, 0, 1023);
  sensorValue = constrain(sensorValue, 0, 1023);
  double temp = Thermister(sensorValue);
  ftemp = (temp * 1.8) + 32.0;
  //String reading = String(idNumber) + String("-") + String(ftemp) + String(" \n");
  String reading = String(idNumber) + String("-") + String(ftemp) + String("\n");
  Serial.print(reading);
  XBee.write(reading.c_str());
}

void loop(void) {
  tempnum();
  delay(1000);
}
