function setup() {
  //createCanvas(1000, 800, WEBGL);
  createCanvas((displayWidth*0.8), (displayHeight*0.8), WEBGL);
}

function draw() {
  background(0);
  rotateY(frameCount * 0.01);
  rotateX(frameCount * 0.01);

  // Set lighting based on mouse position
  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  directionalLight(250, 250, 250, -dirX, -dirY, -1);

  // Draw our boxes
  for (let rot = 0; rot <= 800; rot += 10) {
    noStroke();
    //strokeWeight(1);
    // set fill colour based on position of mouse on X and Y for red and green and 127 for blue
    fill(int(float(mouseX) / width * 255), int(float(mouseY) / height * 255), 127);
    box(width / 10);
    rotate(rot);
    translate(mouseX - (width / 2), mouseY - (height / 2));
  }
}
