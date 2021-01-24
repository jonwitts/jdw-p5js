// Sketch from Generative Design v2
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_2_2_6_01

/**
 * draw tool. draw with a rotating line.
 *
 * MOUSE
 * drag                : draw
 *
 * KEYS
 * 1-4                 : switch default colors
 * delete/backspace    : clear screen
 * d                   : reverse direction and mirror angle
 * space               : new random color
 * arrow left          : rotaion speed -
 * arrow right         : rotaion speed +
 * arrow up            : line length +
 * arrow down          : line length -
 * s                   : save png
 */
'use strict';

var c;
var lineLength = 0;
var angle = 0;
var angleSpeed = 1;

function setup() {
  createCanvas(windowWidth * 0.8, windowHeight * 0.8);
  background(0);
  cursor(CROSS);
  strokeWeight(1);

  c = color(181, 157, 0);
}

function draw() {
  if (mouseIsPressed && mouseButton == LEFT) { // only draw anything when left mouse button is pressed
    push();
    translate(mouseX, mouseY);  // move origin of coordinate system to mouse position 
    rotate(radians(angle));  // now rotate the coordinate system around the mouse position
    stroke(c);
    line(0, 0, lineLength, 0);  // as coordinate system is now rotating, a horizontal line becomes the rotating brush
    pop();

    angle += angleSpeed; // rotation angle is increased by a value for the rotation speed
  }
}

function mousePressed() {
  // create a new random line length each new press
  lineLength = random(70, 200);
}

function keyPressed() {
  if (keyCode == UP_ARROW) lineLength += 5;
  if (keyCode == DOWN_ARROW) lineLength -= 5;
  if (keyCode == LEFT_ARROW) angleSpeed -= 0.5;
  if (keyCode == RIGHT_ARROW) angleSpeed += 0.5;
}

function keyReleased() {
  if (key == 's' || key == 'S') { // save png if S key released
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }
  if (keyCode == DELETE || keyCode == BACKSPACE) background(0);

  // reverse direction and mirror angle
  if (key == 'd' || key == 'D') {
    angle += 180;
    angleSpeed *= -1;
  }

  // change color
  if (key == ' ') c = color(random(255), random(255), random(255), random(80, 100));
  // default colors from 1 to 4
  if (key == '1') c = color(181, 157, 0);
  if (key == '2') c = color(0, 130, 164);
  if (key == '3') c = color(87, 35, 129);
  if (key == '4') c = color(197, 0, 123);
}
