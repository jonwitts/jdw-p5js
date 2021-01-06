function setup() {
  createCanvas(480, 120);
  fill(255);
  stroke(102);
}

function draw() {
  background(0);
  for (let y = 20; y <= height-20; y += 10) {
    for (let x = 20; x <= width-20; x += 10) {
      ellipse(x, y, 4, 4);
      // Draw a line to the position of the mouse
      line(x, y, mouseX, mouseY);
    }
  }
}
