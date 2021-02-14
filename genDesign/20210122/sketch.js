// Sketch from Generative Design v2
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_2_2_4_01

/**
 * limited diffusion aggregation. a new circle is randomly positioned and then seeks out its closest neighbour and moves to it
 *
 * KEYS
 * s                   : save png
 */
'use strict';

var maxCount = 5000; // max count of the cirlces
var currentCount = 1;
var x = [];
var y = [];
var r = [];

function setup() {
  createCanvas(800, 800);
  strokeWeight(0.5);
  stroke(120);

  // first circle
  x[0] = width / 2;
  y[0] = height / 2;
  r[0] = 10;
}

function draw() {
  clear();

  // create a random set of parameters for new circle
  var newR = random(1, 7);
  var newX = random(newR, width - newR);
  var newY = random(newR, height - newR);

  var closestDist = Number.MAX_VALUE;
  var closestIndex = 0;
  // which circle is the closest?
  for (var i = 0; i < currentCount; i++) {
    var newDist = dist(newX, newY, x[i], y[i]);
    if (newDist < closestDist) {
      closestDist = newDist;
      closestIndex = i;
    }
  }

  // show original position of the circle and a line to the new position
  // to fully describe process
  fill(120);
  ellipse(newX, newY, newR * 2, newR * 2);
  line(newX, newY, x[closestIndex], y[closestIndex]);

  // aline it to the closest circle outline
  var angle = atan2(newY - y[closestIndex], newX - x[closestIndex]);

  x[currentCount] = x[closestIndex] + cos(angle) * (r[closestIndex] + newR);
  y[currentCount] = y[closestIndex] + sin(angle) * (r[closestIndex] + newR);
  r[currentCount] = newR;
  currentCount++;

  // draw them
  for (var i = 0; i < currentCount; i++) {
    fill(200);
    ellipse(x[i], y[i], r[i] * 2, r[i] * 2); //draw the circle
  }

  if (currentCount >= maxCount) noLoop(); // stop the program when the upper limit is reached
}

function keyReleased() {
  if (key == 's' || key == 'S') { // save png if S key released
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }
}
