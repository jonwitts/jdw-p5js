// Sketch from Generative Design v2
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_3_1_1_01

/**
 * typewriter. time reactive.
 *
 * MOUSE
 * position y           : adjust spacing (line height)
 *
 * KEYS
 * a-z                  : text input (keyboard)
 * ctrl                 : save png
 */
'use strict';

var textTyped = 'Type slow and fast!';
var fontSizes = [textTyped.length];
var minFontSize = 15;
var maxFontSize = 800;
var newFontSize = 0;

var pMillis = 0;
var maxTimeDelta = 5000.0;

var spacing = 2; // line height
var tracking = 0; // between letters
var font;

function setup() {
  createCanvas(800, 600);

  font = 'Arial';

  noCursor();
  noStroke();

  // init fontSizes
  for (var i = 0; i < textTyped.length; i++) {
    fontSizes[i] = minFontSize;
  }
}

function draw() {
  background(0);
  textAlign(LEFT);
  fill(255, 100);

  spacing = map(mouseY, 0, height, 0, 120);
  translate(0, 200 + spacing);

  var x = 0;
  var y = 0;
  var fontSize = 20;

  for (var i = 0; i < textTyped.length; i++) {
    // get fontsize for the actual letter from the array
    fontSize = fontSizes[i];
    textFont(font, fontSize);
    var letter = textTyped.charAt(i);
    var letterWidth = textWidth(letter) + tracking;

    if (x + letterWidth > width) {
      // start new line and add line height
      x = 0;
      y += spacing;
    }

    // draw letter
    text(letter, x, y);
    // update x-coordinate for next letter
    x += letterWidth;
  }

  // blinking cursor after text
  var timeDelta = millis() - pMillis;
  newFontSize = map(timeDelta, 0, maxTimeDelta, minFontSize, maxFontSize);
  newFontSize = min(newFontSize, maxFontSize);

  fill(200, 30, 40);
  if (int(frameCount / 10) % 2 == 0) fill(255);
  rect(x, y, newFontSize / 2, newFontSize / 20);
}

function keyReleased() {
  if (keyCode == CONTROL ) { // save png if Ctrl key released
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
    fontSizes.push(newFontSize);
  }
  // reset timer
  pMillis = millis();
}
