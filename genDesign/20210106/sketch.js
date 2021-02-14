// Sketch from Generative Design v2
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_1_0_01
'use strict';

function setup() {
  createCanvas(720, 720);
  noCursor();
  colorMode(HSB, 360, 100, 100);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  background(mouseY / 2, 100, 100);
  
  fill(360 - mouseY / 2, 100, 100);
  rect(360, 360, mouseX + 1, mouseX + 1);
}

function keyPressed() {
  if (key == 's' || key == 'S') {
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }
}
