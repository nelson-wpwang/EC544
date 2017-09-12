const int buttonPin1 = 2; 
const int buttonPin2 = 6;// the number of the pushbutton pin
const int ledPin1 =  3;      // the number of the LED pin
const int ledPin2 =  4;
const int ledPin3 =  5;

int i;
int led = 3;
int led2 = 3;
int flag = 0;
int sum = 0;
int buttonState1 = 0;
int buttonState2 = 0;
int lastButtonState = 0;

void setup() {
  Serial.begin(9600);
  // initialize the LED pin as an output:
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  pinMode(ledPin3, OUTPUT);
  pinMode(buttonPin1, INPUT);
  pinMode(buttonPin2, INPUT);
}

void loop() {
  // read the state of the pushbutton value:
  buttonState1 = digitalRead(buttonPin1);
  buttonState2 = digitalRead(buttonPin2);
  if (buttonState2 == HIGH) {
    if (sum == 0) {
      sum = 1;
      func2();
    }
    else {
      sum = 0;
      
    }
      
    Serial.print(sum);
    delay(200);
  }
    
  if (sum == 0 && buttonState1 == HIGH) {
    if (led == 6)
      led = 3;
    func1();
    Serial.print(2);
    led ++;
  }
  }
void func1() {
  switch (led) {
      case 3:{
        digitalWrite(ledPin1, HIGH);
        digitalWrite(ledPin2, LOW);
        digitalWrite(ledPin3, LOW);
        delay(200);
        break;
      }
      case 4:{
        digitalWrite(ledPin2, HIGH);
        digitalWrite(ledPin3, LOW);
        digitalWrite(ledPin1, LOW);
        delay(200);
        break;
      }
      case 5:{
        digitalWrite(ledPin3, HIGH);
        digitalWrite(ledPin2, LOW);
        digitalWrite(ledPin1, LOW);
        delay(200);
        break;
      }
      default:
      break;
      } 
    
}


void func2() {
  digitalWrite(ledPin1, LOW);
  digitalWrite(ledPin2, LOW);
  digitalWrite(ledPin3, LOW);
  lastButtonState = LOW;
  delay(300);
  buttonState2 = digitalRead(buttonPin2);
  while (buttonState2 == LOW) {
    buttonState2 = digitalRead(buttonPin2);
    if (buttonState2 != lastButtonState)
  {
      sum = 0;
      return;
  }
    digitalWrite(led2, HIGH);
    delay(960);
    digitalWrite(led2, LOW);
    led2 ++;
    lastButtonState = buttonState2;
    if (led2 == 6){
      led2 = 3;
    }
  }
}

