let footprints = [];
let color1;
let color2;
let risoColors;

function setup() {
    createCanvas(windowWidth, windowHeight);
    color1 = color(255, 255, 255); // white color
    color2 = color(245, 222, 179);  // mud color
    risoColors = [color(227, 38, 54), color(35, 169, 110), color(39, 106, 171)];  // Riso colors
    noSmooth();
}
function draw() {
    // Create a gradient from white to mud color
    for(let i = 0; i < height; i++) {
        let interpColor = lerpColor(color1, color2, i / height);
        stroke(interpColor);
        line(0, i, width, i);
    }

    // Create noise texture
    for (let i = 0; i < 2000; i++) {
        let x = random(width);
        let y = random(height);
        stroke(245, 222, 179, 25);  // Change the last parameter to control the transparency
        strokeWeight(random(1.5));
        point(x, y);
    }

    // Check if the mouse is clicked, then create new footprint
    if (mouseIsPressed) {
        let newFootprint = new Footprint(mouseX, mouseY);
        footprints.push(newFootprint);
    }

    // Display all footprints
    for (let i = footprints.length-1; i >= 0; i--) {
        footprints[i].display();
        footprints[i].fade();
        if(footprints[i].isGone()){
            footprints.splice(i,1);
        }
    }
}

class Footprint {
    constructor(x, y) {
        this.x = x + random(-5,5);  // Add a random offset to simulate the irregularity of stepping in mud
        this.y = y + random(-5,5);
        this.alpha = 255;  // Initial transparency
        this.color = random(risoColors);  // Each footprint has a random color from the Riso colors
    }

    display() {
        //draw footprint
        push();
        noStroke();
        fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha);
        translate(this.x, this.y);

        beginShape();
        vertex(0,22);
        vertex(5,23 );
        vertex( 10,22);
        vertex(12,20.5 );
        vertex(14,17.5 );
        vertex( 14,10);
        vertex(12,6 );
        vertex(10,3 );
        vertex( 8,0.5);
        vertex( 5,-4);
        vertex(4.5,-6);
        vertex( 5,-10);

        vertex(6,-12.5);
        vertex(10,-19.5);
        vertex(11.5,-24.5);
        vertex( 12,-30);
        vertex(11,-32.5);
        vertex(10,-34);
        vertex(7.5,-35.5);
        vertex(4.5,-36.5);
        vertex(2,-37);
        vertex(0,-36.5);

        vertex(-4,-34);
        vertex(-6,-31.5);
        vertex(-7.6,-28);
        vertex(-8,-22.5);
        vertex(-8.5,-19);
        vertex(-12.5,-10);
        vertex(-15.5,4);
        vertex(-15,10);
        vertex(-13.5,14);
        vertex(-12,16);
        vertex(-9,19);
        vertex( -5,21);
        vertex(-2,22);
        endShape(CLOSE);



        ellipse(13, 30, 14, 14);  // Draw heel of footprint
        ellipse(2.7, 29.5, 11, 11);  // Draw heel of footprint
        ellipse(-5, 28, 9, 9);  // Draw heel of footprint
        ellipse(-11, 25, 7, 7);  // Draw heel of footprint
        ellipse(-15.5, 20, 6, 6);  // Draw heel of footprint

        pop();
    }

    // This function gradually decreases the footprint's transparency
    fade() {
        this.alpha -= 0.2;
        // As the footprint dries, change its color to match the background
        if(this.alpha < 127){
            fill(lerpColor(this.color, color2, (255 - this.alpha) / 128));
        }
    }

    // This function checks if the footprint is completely faded
    isGone() {
        return this.alpha < 0;
    }
}
