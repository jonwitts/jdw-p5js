let squ = 100;
let cols = 1;
let rate = 8;

function setup() {
  createCanvas(1200, 800);
}

function draw() {
  background(0);
  frameRate(rate);
  
  // create our grid
  for (let gridY = 0; gridY < height; gridY += squ) {
    for (let gridX = 0; gridX < width; gridX += squ) {
      
      // select our random pairs of colours
      if (cols == 1) {
        if (getRndInteger(0, 1) == 1) {
          stroke(3, 29, 68, random(10, 255)); // Oxford Blue with random trans
        } else {
          stroke(240, 162, 2, random(10, 255)); // Marigold with random trans
        }
      } else if (cols == 2) {
        if (getRndInteger(0, 1) == 1) {
          stroke(8, 61, 119, random(10, 255)); // Indigo Dye with random trans
        } else {
          stroke(160, 108, 213, random(10, 255)); // Amethyst with random trans
        }
      } else if (cols == 3) {
        if (getRndInteger(0, 1) == 1) {
          stroke(84, 56, 220, random(10, 255)); // Han Purple with random trans
        } else {
          stroke(255, 60, 199, random(10, 255)); // Razzle Dazzle Rose with random trans
        }
      } else if (cols == 4) {
        if (getRndInteger(0, 1) == 1) {
          stroke(140, 255, 152, random(10, 255)); // Mint Green with random trans
        } else {
          stroke(125, 91, 166, random(10, 255)); // Royal Purple with random trans
        }
      }
      
      strokeWeight(random(1, squ)); // random stroke width
      if (getRndInteger(0, 4) == 1) { // randomise our direction
        line(gridX + squ / 2, gridY, gridX + squ / 2, gridY + squ); // vertical
      } else if (getRndInteger(0, 4) == 2) {
        line(gridX, gridY + squ / 2, gridX + squ, gridY + squ / 2); // horizontal
      } else if (getRndInteger(0, 4) == 3) {
        line(gridX, gridY, gridX + squ, gridY + squ); // top left bottom right
      } else {
        line(gridX, gridY + squ, gridX + squ, gridY); // top right bottom left
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
    if (squ > 20) {
      squ -= 10;
    }
  }
  if (keyCode == LEFT_ARROW) { // decrease frame rate if left arrow pressed
    if (rate > 2) {
      rate -= 2;
    }
  }
  if (keyCode == RIGHT_ARROW) { // increase frame rate if right arrow pressed
    if (rate < 60) {
      rate += 2;
    }
  }
  if (key == 1) {
    strokeCap(ROUND); // round stroke caps
  }
  if (key == 2) {
    strokeCap(PROJECT); // projected stroke caps
  }
  // Colour pair selectors
  if (key == 3) {
    cols = 1;
  }
  if (key == 4) {
    cols = 2;
  }
  if (key == 5) {
    cols = 3;
  }
  if (key == 6) {
    cols = 4;
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
