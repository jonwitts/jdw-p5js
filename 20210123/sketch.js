// Sketch from Generative Design v2
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_2_2_6_01

/**
 * A chain of linked pendulums. Each a little shorter and faster than the one it's linked to.
 * Each joint of the pendulum leaves behind its own trail.
 *
 * KEYS
 * 1                   : toggle pendulum
 * 2                   : toggle pendulum path
 * -                   : decrease speed relation
 * +                   : increase speed relation
 * arrow down          : decrease length of lines
 * arrow up            : increase length of lines
 * arrow left          : decrease joints
 * arrow right         : increase joints
 * del, backspace      : clear screen
 * s                   : save png
 *
 * CONTRIBUTED BY
 * [Niels Poldervaart](http://NielsPoldervaart.nl)
 */
'use strict';

var shape;

var joints = 5;
var lineLength = 100;
var speedRelation = 2;
var center;
var pendulumPath;
var angle = 0;
var maxAngle = 360;
var speed;

var showPendulum = true;
var showPendulumPath = true;

function setup() {
  createCanvas(windowWidth * 0.9, windowHeight * 0.8);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
  strokeWeight(1);

  center = createVector(width / 2, height / 2);

  startDrawing();
}

function startDrawing() {
  pendulumPath = [];
  // new empty array for each joint
  for (var i = 0; i < joints; i++) {
    pendulumPath.push([]);
  }

  angle = 0;
  speed = (8 / pow(1.75, joints - 1) / pow(2, speedRelation - 1));
}

function draw() {
  background(0, 0, 0);

  angle += speed; // angle for first pendulum, incremented slightly each frame

  // each frame, create new positions for each joint
  if (angle <= maxAngle + speed) {
    // start at the center position
    var pos = center.copy();

    for (var i = 0; i < joints; i++) {
      var a = angle * pow(speedRelation, i);
      if (i % 2 == 1) a = -a; // reverse direction of rotation every other angle
      var nextPos = p5.Vector.fromAngle(radians(a));
      nextPos.setMag((joints - i) / joints * lineLength);
      nextPos.add(pos);

      if (showPendulum) { // draw circle and line if pendulum is to be shown
        noStroke();
        fill(100, 10);
        ellipse(pos.x, pos.y, 4, 4);
        noFill();
        stroke(100, 10);
        line(pos.x, pos.y, nextPos.x, nextPos.y);
      }

      pendulumPath[i].push(nextPos); // calculate next position of the pendulum and 
      pos = nextPos;                 // use it for the starting point of the  next iteration
    }
  }

  // draw the path for each joint
  if (showPendulumPath) {
    strokeWeight(1.6);
    for (var i = 0; i < pendulumPath.length; i++) {
      var path = pendulumPath[i];

      beginShape();
      var hue = map(i, 0, joints, 120, 360); // colour is determined by the index of the pendulum in the array
      stroke(hue, 80, 60, 50);
      for (var j = 0; j < path.length; j++) {
        vertex(path[j].x, path[j].y);
      }
      endShape();
    }
  }
}

function keyPressed() {
  if (key == 's' || key == 'S') { // save png if S key released
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }

  if (keyCode == DELETE || keyCode == BACKSPACE) startDrawing();

  if (keyCode == UP_ARROW) {
    lineLength += 2;
    startDrawing();
  }
  if (keyCode == DOWN_ARROW) {
    lineLength -= 2;
    startDrawing();
  }
  if (keyCode == LEFT_ARROW) {
    joints--;
    if (joints < 1) joints = 1;
    startDrawing();
  }
  if (keyCode == RIGHT_ARROW) {
    joints++;
    if (joints > 10) joints = 10;
    startDrawing();
  }

  if (key == '+') {
    speedRelation += 0.5;
    if (speedRelation > 5) speedRelation = 5;
    startDrawing();
  }
  if (key == '-') {
    speedRelation -= 0.5;
    if (speedRelation < 2) speedRelation = 2;
    startDrawing();
  }

  if (key == '1') showPendulum = !showPendulum;
  if (key == '2') showPendulumPath = !showPendulumPath;
}
