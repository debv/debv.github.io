// https://p5js.org/examples/simulate-penrose-tiles.html
let ds;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ds = new PenroseLSystem();
  ds.simulate(3);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  ds.render();
}

let color1 = Math.floor(Math.random() * 100);
let color2 = Math.floor(Math.random() * 100);
let color3 = Math.floor(Math.random() * 100);

function PenroseLSystem() {
    this.steps = 0;

    this.axiom = "[X]++[X]++[X]++[X]++[X]";
    this.ruleW = "YF++ZF----XF[-YF----WF]++";
    this.ruleX = "+YF--ZF[---WF--XF]+";
    this.ruleY = "-WF++XF[+++YF++ZF]-";
    this.ruleZ = "--YF++++WF[+ZF++++XF]--XF";

    this.startLength = 800.0;
    this.theta = PI / 5.0;
    this.reset();
}

PenroseLSystem.prototype.simulate = function (gen) {
  while (this.getAge() < gen) {
    this.iterate(this.production);
  }
}

PenroseLSystem.prototype.reset = function () {
    this.production = this.axiom;
    this.drawLength = this.startLength;
    this.generations = 0;
  }

PenroseLSystem.prototype.getAge = function () {
    return this.generations;
  }

// apply substitution rules to create new iteration of production string
PenroseLSystem.prototype.iterate = function() {
  let newProduction = "";

  for(let i = 0; i < this.production.length; ++i) {
    let step = this.production.charAt(i);
    if (step == 'W') {
      newProduction = newProduction + this.ruleW;
    }
    else if (step == 'X') {
      newProduction = newProduction + this.ruleX;
    }
    else if (step == 'Y') {
      newProduction = newProduction + this.ruleY;
    }
    else if (step == 'Z') {
      newProduction = newProduction + this.ruleZ;
    }
    else {
      if (step != 'F') {
        newProduction = newProduction + step;
      }
    }
  }

  this.drawLength = this.drawLength * 0.65;
  this.generations++;
  this.production = newProduction;
}

// convert production string to a turtle graphic
PenroseLSystem.prototype.render = function () {
    translate(width / 2, height / 2);

    this.steps += 15;
    if(this.steps > this.production.length) {
      this.steps = this.production.length;
    }

    for(let i = 0; i < this.steps; ++i) {
      let step = this.production.charAt(i);

      if( step == 'F') {
        stroke(color1, color2, color3);
        for(let j=0; j < this.repeats; j++) {
          line(0, 0, 0, -this.drawLength);
          noFill();
          translate(0, -this.drawLength);
        }
        this.repeats = 1;
      }
      else if (step == '+') {
        rotate(this.theta);
      }
      else if (step == '-') {
        rotate(-this.theta);
      }
      else if (step == '[') {
        push();
      }
      else if (step == ']') {
        pop();
      }
    }
  }


