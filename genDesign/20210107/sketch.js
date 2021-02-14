// Sketch from Generative Design v2
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_1_1_2_01

/**
 * changing the color circle by moving the mouse.
 *
 * MOUSE
 * position x          : saturation
 * position y          : brighness
 *
 * KEYS
 * 1-5                 : number of segments
 * s                   : save png
 */
'use strict';

var segmentCount = 360;
var radius = 350;

function setup() {
  createCanvas(800, 800);
  noStroke();
}

function draw() {
  colorMode(HSB, 360, width, height);
  //background(360, 0, height);
  background(0, 0, 0);

  var angleStep = 360 / segmentCount;

  beginShape(TRIANGLE_FAN);
  vertex(width / 2, height / 2);

  for (var angle = 0; angle <= 360; angle += angleStep) {
    var vx = width / 2 + cos(radians(angle)) * radius;
    var vy = height / 2 + sin(radians(angle)) * radius;
    vertex(vx, vy);
    fill(angle, mouseX, mouseY);
  }

  endShape();
}

function keyPressed() {
  if (key == 's' || key == 'S') {
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }
  
  switch (key) {
  case '1':
    segmentCount = 360;
    break;
  case '2':
    segmentCount = 45;
    break;
  case '3':
    segmentCount = 24;
    break;
  case '4':
    segmentCount = 12;
    break;
  case '5':
    segmentCount = 6;
    break;
  }
}
