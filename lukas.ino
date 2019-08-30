int tempPin = A0;
int relayOut = 2;
int bitsIn;
const float bitsIntoVoltage = 0.0048828125; // 5v / 1024(10bits)
float voltage = 0.0;
float voltToTempConv = 0.0;
String setPoint = "7";


void setup() {

   Serial.begin(9600);
   pinMode(relayOut, OUTPUT);
  
}

void loop() {
 
  if (Serial.available() > 0) 
  {
    setPoint = readSerialUntil('\n');

    if ((setPoint.toFloat() - 5.0) > voltToTempConv)
    {
      digitalWrite(relayOut, HIGH);
    }
    if ((setPoint.toFloat() + 5.0) < voltToTempConv)
    {
      digitalWrite(relayOut, LOW);
    }
  }
    analogRead(tempPin);// clear controller register
    delay(100);
    bitsIn = analogRead(tempPin);
    voltage = bitsIn * bitsIntoVoltage;
    voltToTempConv = (voltage-1.25)/ 0.005;
    Serial.flush();
    Serial.print("{'probeOne':");
    Serial.print("'");
    Serial.print(voltToTempConv);
    Serial.print("'");
    Serial.print("}");
    Serial.print("\n");

  delay(100);

}

String readSerialUntil(char endChar)
{
  char charIn;
  String stringOut;
  if (Serial.available() > 0) 
  {
    while('\n' != charIn)
    {
      charIn = Serial.read();
      if('\r' == charIn || '\n' == charIn)
      {
        return stringOut;
      }
      else
      {
        stringOut += charIn;
      }
    }
  }
  
}


