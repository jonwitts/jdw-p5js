function setup() {
  createCanvas(480, 120);
  noStroke();
}

function draw() {
  background(0);
  for(let y = 0; y <= height; y += 40) {
    for(let x = 0; x <= width; x += 40) {
      fill(255, 140);
      ellipse(x, y, 40, 40);
    }
  }
}
