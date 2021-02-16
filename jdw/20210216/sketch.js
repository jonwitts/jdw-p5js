let stripeWidth = 50;

function setup() {
  createCanvas(1000, 800);
}

function draw() {
  background(0);
  stroke(255, random(10, 255)); // white stroke with random transparency
  // create our stripes
  for (let stripeX = 0; stripeX < width; stripeX += stripeWidth) {
    strokeWeight(random(1, stripeWidth)); // random stroke width
    line(stripeX + stripeWidth / 2, 0, stripeX + stripeWidth / 2, height); // draw our line
    }
  }

function keyReleased() {
  if (key == 's' || key == 'S') { // save png if S key released
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }
}

function keyPressed() {
if (keyCode == UP_ARROW) { // increase stripe size if up arrow pressed
    if (stripeWidth < 200) {
      stripeWidth += 10;
    }
  }
  if (keyCode == DOWN_ARROW) { // decrease stripe size if down arrow pressed
    if (stripeWidth > 10) {
      stripeWidth -= 10;
    }
  }
}
