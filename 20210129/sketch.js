// Sketch from Generative Design v2
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_3_2_4_01

/**
 * Drawing tool for creating moire effect compositions using
 * smooth path of any length, width, smoothness and colour.
 *
 * MOUSE
 * position x          : path simplification
 * position y          : ribbon width
 *
 * KEYS
 * arrow right         : increase path density
 * arrow left          : decrease path density
 * arrow up            : increase font size
 * arrow down          : decrease font size
 * control             : save png
 *
 * CONTRIBUTED BY
 * [Niels Poldervaart](http://NielsPoldervaart.nl)
 */
'use strict';

var letters = [];
var density = 2.5;
var ribbonWidth = 92;
var shapeColor;
var fontSize = 600;
var pathSimplification = 0;
var pathSampleFactor = 0.1;

var textTyped = 'a';

var font;

function preload() {
  font = loadFont('data/NotoSans-Bold.ttf');
}

function setup() {
  createCanvas(windowWidth * 0.8, windowHeight * 0.8);
  noFill();
  strokeWeight(1);
  shapeColor = color(255);

  createLetters();
}

function draw() {
  background(0);

  translate(100, height * 0.75);

  pathSampleFactor = 0.1 * pow(0.02, mouseX / width);
  ribbonWidth = map(mouseY, 0, height, 1, 200);

  for (var i = 0; i < letters.length; i++) {
    letters[i].draw();
  }
}

function createLetters() { //this function is called whenever the progam starts or whenever the entered text changes
  letters = [];
  var chars = textTyped.split(''); // split inputted text into the chars array

  var x = 0;
  for (var i = 0; i < chars.length; i++) {
    if (i > 0) {
      var charsBefore = textTyped.substring(0, i); //use substring 0 to index to remove characters before current letter
      x = font.textBounds(charsBefore, 0, 0, fontSize).w; // x = the width of the current letter. found with textBounds
    }
    var newLetter = new Letter(chars[i], x, 0); // each new letter is created from the Letter class
    letters.push(newLetter); // and added to the letters array
  }
}

function Letter(char, x, y) { // the Letter class...
  this.char = char;
  this.x = x;
  this.y = y;

  Letter.prototype.draw = function() { // the draw function of teh Letter class is called each frame to draw the font outline further and further inward
    var path = font.textToPoints(this.char, this.x, this.y, fontSize, {sampleFactor: pathSampleFactor}); // textToPints function turns the font outline into an array of points
    stroke(shapeColor);

    for (var d = 0; d < ribbonWidth; d += density) { // this loop draws teh individual paths. d = distance of path from original path
      beginShape();

      for (var i = 0; i < path.length; i++) {
        var pos = path[i];
        var nextPos = path[i + 1]; // pos and nextPos are two consecutive positions from path array

        if (nextPos) { // if nextPos exists i.e. not the end of the path
          var p0 = createVector(pos.x, pos.y); // create vectors from pos
          var p1 = createVector(nextPos.x, nextPos.y); // and from nextPos
          var v = p5.Vector.sub(p1, p0); // use sub() to calculate the differnce between the two points and store them in v
          v.normalize(); // vector v is moved to length 1 with normalize()
          v.rotate(HALF_PI); // vector v is rotated 90 degrees
          v.mult(d); // vector v is multiplied by d
          var pneu = p5.Vector.add(p0, v); // position of offset path is determined by adding v to p0
          curveVertex(pneu.x, pneu.y);
        }
      }

      endShape(CLOSE);
    }
  };
}

function keyReleased() {
  if (keyCode == CONTROL ) { // save png if Ctrl key released
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }

  if (keyCode == LEFT_ARROW) density *= 1.25;
  if (keyCode == RIGHT_ARROW) density /= 1.25;

  if (keyCode == UP_ARROW) {
    fontSize *= 1.1;
    createLetters();
  }
  if (keyCode == DOWN_ARROW) {
    fontSize /= 1.1;
    createLetters();
  }

  if (keyCode == ENTER) createLetters();
}

function keyPressed() {
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    if (textTyped.length > 0) {
      textTyped = textTyped.substring(0, textTyped.length - 1);
      createLetters();
    }
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
    createLetters();
  }
}
