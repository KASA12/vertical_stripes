let pg = null;
let particles = [];

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(60);
  background(140, 10, 10, 100);

  mouseX = 60;
  mouseY = height * 2 / 3;

  pg = createGraphics(windowWidth, windowHeight);

  for (let i = 0; i < 5; i++) {
    for (let x = 0; x < width; x += 5) {
      particles.push(new Particle(x, random(0, height)));
    }
  }
}

function draw() {

  pg.background(0, 0, 0, 255);
  pg.colorMode(RGB, 255, 255, 255, 255);
  pg.smooth();

  const d = 100;
  for (let i = -width; i < width; i += d) {
    for (let j = -height; j < height; j += d) {
      if ((i / d + j / d) % 2 === 0) {
        pg.fill(0, 255, 0, 255);
        pg.stroke(0, 255, 0, 255);
        //pg.rect(i, j, d, d);
        pg.rect(i + mouseX, j + mouseY, d, d);
      }
    }
  }

  //text
  pg.fill(255, 0, 0, 255);
  pg.stroke(255, 0, 0, 255);
  pg.textSize(200);
  pg.textAlign(LEFT, BOTTOM);
  pg.textFont("Georgia");
  pg.strokeWeight(1);
  pg.text("p5*js", mouseX, mouseY);

  //frame
  pg.fill(255, 0, 0, 255);
  pg.stroke(255, 0, 0, 255);
  pg.noFill();
  pg.strokeWeight(20);
  pg.rect(20, 20, width - 40, height - 40);

  //line
  pg.fill(255, 0, 0, 255);
  pg.stroke(255, 0, 0, 255);
  pg.strokeWeight(5);
  pg.line(-width, mouseY, width * 2, mouseY);
  pg.line(mouseX, -height, mouseX, height * 2);

  beginShape(POINTS);
  particles.forEach(p => {
    p.update();
  })
  endShape();
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {
    this.y += 2;

    if (this.y > height) {
      this.y = 0;
    }

    if (this.y < 0 || height < this.y || this.x < 0 || width < this.x) {
      return;
    }

    strokeWeight(2);
    if (pg.get(this.x, this.y)[0] === 255) {
      stroke(130, 10, 100, 100);
    } else if (pg.get(this.x, this.y)[1] === 255) {
      stroke(130, 10, 30, 100);
    } else {
      stroke(130, 10, 10, 100);
    }

    vertex(this.x, this.y);
  }
}