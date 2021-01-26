// Sketch from Generative Design v2
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_2_3_2_01

/**
 * draw tool. shows how to work with relations between elements.
 *
 * MOUSE
 * drag                : draw
 *
 * KEYS
 * 1                   : draw mode 1 - fixed distance
 * 2                   : draw mode 2 - distance threshold
 * del, backspace      : clear screen
 * arrow up            : line length +
 * arrow down          : line length -
 * s                   : save png
 */
'use strict';

var drawMode = 1;

var col;
var x = 0;
var y = 0;
var stepSize = 5.0;
var lineLength = 25;

function setup() {
  // use 70% screen size
  createCanvas(displayWidth * 0.7, displayHeight * 0.7);
  background(0);
  col = color(random(255), random(255), random(255), random(100));
  x = mouseX;
  y = mouseY;
  cursor(CROSS);
}

function draw() {
  if (mouseIsPressed && mouseButton == LEFT) {
    var d = dist(x, y, mouseX, mouseY); // mouse is pressed so calculate distance from drawing position x,y to current mouse position

    if (d > stepSize) { // if distance is greater than stepSize draw new point
      var angle = atan2(mouseY - y, mouseX - x); // need to calculate angle to previous drawing point uses atan2 - https://p5js.org/reference/#/p5/atan2

      push();
      translate(x, y);
      rotate(angle);
      stroke(col); // lines are alternativly random col value or medimum grey... % 2 == 0
      if (frameCount % 2 == 0) stroke(150);
      line(0, 0, 0, lineLength * random(0.95, 1) * d / 10); //line is drawn. Length is controlled by lineLength, a random factor and d / 10 - so the further from the previous point, or teh faster the mouse movement, the longer the line
      pop();

      if (drawMode == 1) { // in drawmode 1 new point is placed at distance stepSize from old position
        x = x + cos(angle) * stepSize;
        y = y + sin(angle) * stepSize;
      } else { // in drawmode 2 mouse determines new position
        x = mouseX;
        y = mouseY;
      }
    }
  }
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
  col = color(random(255), random(255), random(255), random(100));
  // lineLength = random(15, 50);
}

function keyReleased() {
  if (key == 's' || key == 'S') { // save png if S key released
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }
  if (keyCode == DELETE || keyCode == BACKSPACE) background(0);

  if (key == '1') drawMode = 1;
  if (key == '2') drawMode = 2;
}

function keyPressed() {
  // lineLength ctrls arrowkeys up/down
  if (keyCode == UP_ARROW) lineLength += 5;
  if (keyCode == DOWN_ARROW) lineLength -= 5;
}
