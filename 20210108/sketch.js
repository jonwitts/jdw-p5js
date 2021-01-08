// Sketch from Generative Design v2
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_1_2_1_01

/**
 * shows how to interpolate colors in different styles/ color modes
 *
 * MOUSE
 * left click          : new random color set
 * position x          : interpolation resolution
 * position y          : row count
 *
 * KEYS
 * 1-2                 : switch interpolation style
 * s                   : save png
 */
'use strict';

var tileCountX = 2;
var tileCountY = 10;

var colorsLeft = [];
var colorsRight = [];
var colors = [];

var interpolateShortest = true;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB);
  noStroke();
  shakeColors();
}

function draw() {
  tileCountX = int(map(mouseX, 0, width, 2, 100)); // num of color graduations and 
  tileCountY = int(map(mouseY, 0, height, 2, 10)); // num of rows determined by mouse position
  var tileWidth = width / tileCountX;
  var tileHeight = height / tileCountY;
  var interCol;
  colors = [];

  for (var gridY = 0; gridY < tileCountY; gridY++) { // draw the grid row by row
    var col1 = colorsLeft[gridY]; // colours for left and right column
    var col2 = colorsRight[gridY]; // are set in these two variables

    for (var gridX = 0; gridX < tileCountX; gridX++) {
      var amount = map(gridX, 0, tileCountX - 1, 0, 1);

      if (interpolateShortest) {
        // switch to rgb
        colorMode(RGB);
        interCol = lerpColor(col1, col2, amount); // lerpColor calculates the intermediary colours
        // switch back
        colorMode(HSB);
      } else {
        interCol = lerpColor(col1, col2, amount);
      }

      fill(interCol);

      var posX = tileWidth * gridX;
      var posY = tileHeight * gridY;
      rect(posX, posY, tileWidth, tileHeight);

      // save color for potential ase export
      colors.push(interCol);
    }
  }
}

function shakeColors() {
  for (var i = 0; i < tileCountY; i++) {
    colorsLeft[i] = color(random(0, 60), random(0, 100), 100);
    colorsRight[i] = color(random(160, 190), 100, random(0, 100));
  }
}

function mouseReleased() {
  shakeColors();
}

function keyPressed() {
  if (key == 's' || key == 'S') {
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }
  if (key == '1') interpolateShortest = true;
  if (key == '2') interpolateShortest = false;
}
