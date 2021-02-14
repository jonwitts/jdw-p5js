// Sketch from Generative Design v2
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_2_3_3_01

/**
 * drawing tool. shows how to draw with dynamic text.
 *
 * MOUSE
 * drag                : draw with text
 *
 * KEYS
 * del, backspace      : clear screen
 * arrow up            : angle distortion +
 * arrow down          : angle distortion -
 * s                   : save png
 */
'use strict';

var x = 0;
var y = 0;
var stepSize = 5.0;

var font = 'Georgia';
var letters = 'Lovers find secret places, inside this violent world, where they make transactions, with beauty.';
var fontSizeMin = 3;
var angleDistortion = 0.0;

var counter = 0;

function setup() {
  // use 70% screen size
  createCanvas(displayWidth * 0.7, displayHeight * 0.7);
  background(0);
  cursor(CROSS);

  x = mouseX;
  y = mouseY;

  textFont(font);
  textAlign(LEFT);
  fill(255, 150);
}

function draw() {
  if (mouseIsPressed && mouseButton == LEFT) {
    var d = dist(x, y, mouseX, mouseY); // calculate distance between current position and mouse position. This determines the size of the font
    textSize(fontSizeMin + d / 2); // stops font from getting too small
    var newLetter = letters.charAt(counter); // select next character from letters string
    stepSize = textWidth(newLetter); // set stepSize to next letter's width

    if (d > stepSize) { // if distance from last letter to mouse position (d) is greater than width of next letter...
      var angle = atan2(mouseY - y, mouseX - x);

      push();
      translate(x, y);
      rotate(angle + random(angleDistortion));
      text(newLetter, 0, 0);
      pop();

      counter++; // increment counter to keep count of how many letters have been drawn. 
      if (counter >= letters.length) counter = 0; // if counter is greater than length of letters string, reset to 0

      x = x + cos(angle) * stepSize;
      y = y + sin(angle) * stepSize;
    }
  }
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
}

function keyReleased() {
  if (key == 's' || key == 'S') { // save png if S key released
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }
  if (keyCode == DELETE || keyCode == BACKSPACE) background(0);
}

function keyPressed() {
  // angleDistortion ctrls arrowkeys up/down
  if (keyCode == UP_ARROW) angleDistortion += 0.1;
  if (keyCode == DOWN_ARROW) angleDistortion -= 0.1;
}
