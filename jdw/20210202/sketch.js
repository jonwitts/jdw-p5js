// Spiraling circles
/*
 * s saves PNG 
 * 
 * up arrow increases speed
 * down arrow decreases speed
 * 
 * delete or backspace resets
 * 
*/

let angle = 2.0;
let scalar = 3.5;
let speed = 0.2;
let col = (255, 100);
let size = 10;

function setup() { 
  createCanvas(displayWidth * 0.7, displayHeight * 0.7);
  noFill();
  stroke(col);
  background (0);
} 

function draw() { 
  let x = (displayWidth * 0.7)/2 + cos(angle) * scalar;
  let y = (displayHeight * 0.7)/2 + sin(angle) * scalar;
  ellipse(x, y, size, size);
  angle += speed;
  scalar += speed;
  size = size + 0.1;
}

function keyReleased() {
  if (key == 's' || key == 'S' ) { // save png if s key released
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }
  if (keyCode == UP_ARROW ) {
    speed = speed + 0.1;
  }
  if (keyCode == DOWN_ARROW ) {
    speed = speed - 0.1;
  }
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    clear();
    angle = 2.0;
    speed = 0.2;
    scalar = 3.5;
    size = 10;
    x = (displayWidth * 0.7)/2 + cos(angle) * scalar;
    y = (displayHeight * 0.7)/2 + sin(angle) * scalar;
  }
}
