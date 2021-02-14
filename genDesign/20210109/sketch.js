// Sketch from Generative Design v2
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_1_2_1_01

/**
 * drawing a filled circle with lines.
 *
 * MOUSE
 * position x          : length
 * position y          : thickness and number of lines
 *
 * KEYS
 * s                   : save png
 */
'use strict';

function setup() {
  createCanvas(550, 550);
  strokeCap(SQUARE);
}

function draw() {
  background(255);
  translate(width / 2, height / 2); // move 0,0 to centre of canvas

  var circleResolution = int(map(mouseY, 0, height, 2, 80)); // convert y of mouse to between 2 and 80
  var radius = mouseX - width / 2; // as you move the mouse to the centre, the radius decreases. Add 0.5 so radius is at least 1.0
  var angle = TWO_PI / circleResolution; // angle is a full circle (TWO_PI) divided by the number of lines

  strokeWeight(mouseY / 20);

  for (var i = 0; i <= circleResolution; i++) {
    var x = cos(angle * i) * radius;
    var y = sin(angle * i) * radius;
    line(0, 0, x, y);
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') {
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }
}
