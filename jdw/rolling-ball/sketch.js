let rad = 40; // Radius of the sphere
let ballX = 0; // init start ball locations
let ballY = 0; // init start ball locations
let bounce = 0.5; // number of pixels to move off edge
let DEBUG = 0; // set to 1 to display debug info to screen

// pre-load our fonts
let roboto;
function preload() {
  roboto = loadFont('../assets/Roboto-Regular.ttf');
}

function setup() {
  createCanvas((windowWidth*displayDensity())*0.7, (windowHeight*displayDensity())*0.7, WEBGL); 
  // multiple window size by display density to get actual size
  noStroke();
  if (DEBUG) {
    strokeWeight(1);
    stroke(0);
  }
}

function draw() {
  background(87, 150, 96);
  angleMode(DEGREES);
  fill(255, 0, 0);
  textFont(roboto);
  textSize(32);
  if (DEBUG) {
    text('Height / 2 = ' + ((windowHeight*displayDensity())*0.7)/2, 0, -30);
    text('Width / 2 = ' + ((windowWidth*displayDensity())*0.7)/2, 0, 0);
    text('Y rot = ' + rotationY, 0, 30);
    text('X rot = ' + rotationX, 0, 60);
    text('ballX = ' + ballX, 0, 90);
    text('ballY = ' + ballY, 0, 120);
  }
  
  // Set up lighting
  ambientLight(60, 60, 60);
  pointLight(255, 255, 255, 0, 0, 100);
  
  // Check if our ball is not touching the edges of the screen
  if (ballX > -(width / 2) + (rad*2) && ballX < (width / 2) - (rad*2) && ballY > -(height / 2) + (rad*2) && ballY < (height / 2) - (rad*2)) {
    if (DEBUG) {
      text('updating ball x and y', 0, 150);
    }
    if (rotationY < 0 && rotationY > -90) {
      ballX = ballX + rotationY;
    }
    if (rotationY > 0 && rotationY < 90) {
      ballX = ballX + rotationY;
    }
    if (rotationX < 0 && rotationX > -90) {
      ballY = ballY + rotationX;
    }
    if (rotationX > 0 && rotationX < 90) {
      ballY = ballY + rotationX;
    }
  // We are not within the edges, so must be on one of the edges...
  } else if (ballX < -(width / 2) + (rad*2)) { // on left hand side
    // move to the right
    ballX = ballX + bounce;
  } else if (ballX > (width / 2) - (rad*2)) { // on right hand side
    //move to the left
    ballX = ballX - bounce;
  } else if (ballY < -(height / 2) + (rad*2)) { // on top
    // move down
    ballY = ballY + bounce;
  } else if (ballY > (height / 2) - (rad*2)) { // on bottom
    //move up
    ballY = ballY - bounce;
  } 
  // translate to ball locations
  translate(ballX, ballY);
  // draw the ball
  specularMaterial(255, 0, 0);
  shininess(20);
  sphere(rad*2);
}
