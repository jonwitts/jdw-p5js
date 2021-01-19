// Sketch from Generative Design v2
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_2_1_5_01

/**
 * Simple moire effect demonstration by moving, rotating
 * and scaling a shape of densely packed lines over
 * a background also consisting of densely packed lines.
 *
 * MOUSE
 * mouseX              : overlay rotation or position x
 * mouseY              : overlay scaling
 *
 * KEYS
 * 1-2                 : switch draw mode
 * s                   : save png
 *
 * CONTRIBUTED BY
 * [Niels Poldervaart](http://NielsPoldervaart.nl)
 */
'use strict';

var drawMode = 1;

function setup() {
  createCanvas(800, 800);
  noFill();
}

function draw() {
  background(0);

  translate(width / 2, height / 2);

  // first shape (fixed)
  strokeWeight(3);
  overlay();  // overlay function to draw background image a second time?

  // second shape (dynamically translated/rotated and scaled)
  var x = map(mouseX, 0, width, -50, 50); // calcualte translation x using mouseX
  var a = map(mouseX, 0, width, -0.5, 0.5); // calculate rotation a using mouseX 
  var s = map(mouseY, 0, height, 0.7, 1); // calculate scaling s using mouseY

  if (drawMode == 1) rotate(a); // depending on draw mode coordinates are either moved horizonitaly or rotated
  if (drawMode == 2) translate(x, 0);
  scale(s);

  strokeWeight(2);
  overlay(); // overlay graphic drawn with different stroke width
}

function overlay() { // overlay defined here...
  var w = width - 100;
  var h = height - 100;
  stroke(255);

  if (drawMode == 1) { // if drawMode is 1 draw a series of lines
    for (var i = -w / 2; i < w / 2; i += 5) {
      line(i, -h / 2, i, h / 2);
    }
  } else if (drawMode == 2) { // if drawMode is 2 draw a series of increasing circles
    for (var i = 0; i < w; i += 10) {
      ellipse(0, 0, i);
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') { // save png if S key released
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }
  // change draw mode
  if (key == '1') drawMode = 1;
  if (key == '2') drawMode = 2;
}
