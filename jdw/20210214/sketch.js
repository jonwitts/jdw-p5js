let squ = 200;
let drawMode = 1;

function setup() {
  createCanvas(1200, 800);
}

function draw() {
  //background(0);
  noFill();
  // set stroke colour based on position of mouse on X and Y for red and green and 127 for blue
  stroke(int(float(mouseX) / width * 255), int(float(mouseY) / height * 255), 127);
  
  // create our grid
  for (let gridY = 0; gridY < height; gridY += squ) {
    for (let gridX = 0; gridX < width; gridX += squ) {
      if (drawMode == 1) {
        ellipse(gridX + squ / 2, gridY + squ / 2, squ / sin(mouseX), squ / cos(mouseY));
      }
      if (drawMode == 2) {
        ellipse(gridX + squ / 2, gridY + squ / 2, squ * sin(mouseX), squ * cos(mouseY));
      }
    }
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') { // save png if S key released
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }
  if (key == '1') {
    drawMode = 1;
  }
  if (key == '2') {
    drawMode = 2;
  }
  if (keyCode == UP_ARROW) { // increase square size if up arrow pressed
    if (squ < 800) {
      squ += 10;
    }
  }
  if (keyCode == DOWN_ARROW) { // decrease square size if up arrow pressed
    if (squ > 20) {
      squ -= 10;
    }
  }
  if (keyCode == BACKSPACE || keyCode == DELETE) {
    background(0);
  }
}
