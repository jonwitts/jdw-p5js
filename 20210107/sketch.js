// Sketch from Generative Design v2
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_1_1_1_01
'use strict';

let stepX;
let stepY;

function setup() {
  createCanvas(800, 400);
  noStroke();
  colorMode(HSB, width, height, 100); // Hue set between 0 and 800, Saturation between 0 and 400
}

function draw() {
  stepX = mouseX + 2; // add 2 to stop being too small
  stepY = mouseY + 2; // which would lengthen display time
  
  for (let gridY = 0; gridY < height; gridY += stepY) { // outer loop sets y position
    for (let gridX = 0; gridX < width; gridX += stepX) { // inner loop sets x position
      fill(gridX, height - gridY, 100); // hue set b gridX, sat decresses inline with gridY
      rect(gridX, gridY, stepX, stepY);
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') {
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }
}
