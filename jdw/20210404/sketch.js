let squ = 25;
let cols = 3;
let scl = 1;
let rate = 5;

function setup() {
  createCanvas(1200, 800);
}

function draw() {
	frameRate(rate);
  background(0);
  noStroke();
  
	for (let gridY = 0; gridY < height; gridY += squ) {
		for (let gridX = 0; gridX < width; gridX += squ) {
			// set default fill colour
			  if (cols == 1) {
				  if (getRndInteger(0, 1) == 1) {
					  fill(255, 255, 255, random(10, 255)); // white fill with random transparency
				  } else {
					  fill(50, 50, 50, random(10, 255)); // grey fill with random transparency
				  }
			  }
			// select our random pairs of colours
			if (cols == 2) {
				if (getRndInteger(0, 1) == 1) {
					fill(100, 194, 206, random(10, 255)); // Middle Blue with random trans
				} else {
					fill(70, 12, 31, random(10, 255)); // Dark Sienna with random trans
				}
			  }
			  if (cols == 3) {
				if (getRndInteger(0, 1) == 1) {
				  fill(106, 1, 54, random(10, 255)); // Tyrian Purple with random trans
				} else {
				  fill(191, 171, 37, random(10, 255)); // Old Gold with random trans
				}
			  }
			ellipse(gridX + random(0, squ), gridY + random(0, squ), random(5, squ*scl))
		}
	}
}

function keyReleased() {
  if (key == 's' || key == 'S') { // save png if S key released
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }
  if (key == 1) {
    cols = 1;
  }
  if (key == 2) {
    cols = 2;
  }
  if (key == 3) {
    cols = 3;
  }
  if (key == 9) {
	  if (squ > 10) {
		  squ -= 5;
	  }
  }
  if (key == 0) {
	  if (squ < 100) {
		  squ += 5;
	  }
  }
  if (keyCode == UP_ARROW) {
	  scl += 0.25; 
  }
  if (keyCode == DOWN_ARROW) {
	  scl -= 0.25; 
  }
  if (keyCode == RIGHT_ARROW) {
	  if (rate < 60) {
		  rate += 1; 
	  }
  }
  if (keyCode == LEFT_ARROW) {
	  if (rate > 2) {
		  rate -= 1; 
	  }
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
