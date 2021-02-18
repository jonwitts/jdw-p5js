let squ = 100;
let cols = 1;

function setup() {
  createCanvas(1200, 800);
}

function draw() {
  background(0);
  // set default stroke colour
  if (cols == 1) {
    stroke(255, 255, 255, random(10, 255)); // white stroke with random transparency
  }
  // create our grid
  for (let gridY = 0; gridY < height; gridY += squ) {
    for (let gridX = 0; gridX < width; gridX += squ) {
      
      // select our random pairs of colours
      if (cols == 2) {
        if (getRndInteger(0, 1) == 1) {
          stroke(100, 194, 206, random(10, 255)); // Middle Blue with random trans
        } else {
          stroke(70, 12, 31, random(10, 255)); // Dark Sienna with random trans
        }
      }
      if (cols == 3) {
        if (getRndInteger(0, 1) == 1) {
          stroke(106, 1, 54, random(10, 255)); // Tyrian Purple with random trans
        } else {
          stroke(191, 171, 37, random(10, 255)); // Old Gold with random trans
        }
      }
      
      strokeWeight(random(1, squ)); // random stroke width
      if (getRndInteger(0, 1) == 1) { // randomise our direction
        line(gridX + squ / 2, gridY, gridX + squ / 2, gridY + squ);
      } else {
        line(gridX, gridY + squ / 2, gridX + squ, gridY + squ / 2);
      }
    }
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') { // save png if S key released
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) { // increase square size if up arrow pressed
    if (squ < 800) {
      squ += 10;
    }
  }
  if (keyCode == DOWN_ARROW) { // decrease square size if up arrow pressed
    if (squ > 10) {
      squ -= 10;
    }
  }
  if (key == 1) {
    strokeCap(ROUND); // round stroke caps
  }
  if (key == 2) {
    strokeCap(PROJECT); // projected stroke caps
  }
  if (key == 3) {
    cols = 1;
  }
  if (key == 4) {
    cols = 2;
  }
  if (key == 5) {
    cols = 3;
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
