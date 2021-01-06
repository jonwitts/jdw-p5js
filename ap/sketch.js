WIDTH = 1000;
HEIGHT = 800;

function setup() {
  createCanvas(WIDTH, HEIGHT)
  background(0);
}

function draw() {
  stroke(255,255,255);
  // set fill colour based on position of mouse on X and Y for red and green and random value for blue and random for the alpha
  fill(int(float(mouseX) / WIDTH * 255), int(float(mouseY) / HEIGHT * 255), int(random(255)), int(random(255)));
  
  // clear background if C key pressed
  if (isKeyPressed && (key == 'c' || key == 'C')) {
    background(0);
  }
  
  // draw ellipse if Q key pressed, else draw rectangle if W key pressed
  if (isKeyPressed && (key == 'q' || key == 'Q')) {
    ellipse(mouseX, mouseY, pmouseX - mouseX, pmouseY - mouseY);
  } else if (isKeyPressed && (key == 'w' || key == 'W')){
    rect(mouseX, mouseY, pmouseX - mouseX, pmouseY - mouseY);
  }
}
