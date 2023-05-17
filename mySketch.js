
const textToWrite = "MUDPRESS";
const SEGMENTS    = 200;

//auto start variables
let centerX, centerY, fontSize, INNER_RADIUS, RADIUS_VARIATION;

function setup() {
	createCanvas(windowWidth, windowHeight);
	centerX = windowWidth/2;
	centerY = windowHeight/2;
	
	let screenPct = min(height, width) / 1000;
	fontSize = screenPct * 150;
	INNER_RADIUS = screenPct * 200;
	RADIUS_VARIATION = screenPct * 200;
	
	textFont('Helvetica');
	textSize(fontSize);
}

//code adapted from @GoToLoop
//generates a circular noise with perfect looping
//https://forum.processing.org/one/topic/how-to-make-perlin-noise-loop.html
function pointForIndex(pct) {
	const NOISE_SCALE       = 1.5;
  let angle = pct * TWO_PI;
  let cosAngle = cos(angle);
  let sinAngle = sin(angle);
  let time = frameCount / 100;
  let noiseValue = noise(NOISE_SCALE * cosAngle + NOISE_SCALE, NOISE_SCALE * sinAngle + NOISE_SCALE, time);
  let radius = INNER_RADIUS + RADIUS_VARIATION * noiseValue;
  return {
		x: radius * cosAngle + centerX,
		y: radius * sinAngle + centerY
	};
}

function draw() {
  background(255);
	fill(200);
  noStroke();
	
	//draw sphere
	beginShape();
		for (let i = 0; i < SEGMENTS; i++) {
			let p0 = pointForIndex(i/SEGMENTS);
                                   
			vertex(p0.x, p0.y);
		}
	endShape(CLOSE);
	
	//draw text
	//let pct = atan2(mouseY - centerY, mouseX - centerX) / TWO_PI;//follow mouse
	let pct = 0.5;//dont follow mouse
	let pixToAngularPct = 1/((INNER_RADIUS+RADIUS_VARIATION/2)*TWO_PI);
	for (var i = 0; i < textToWrite.length; i++) {
		let charWidth = textWidth(textToWrite.charAt(i));
		pct += charWidth/2 * pixToAngularPct;
		
		//calculate angle
		let leftP = pointForIndex(pct-0.01);
		let rightP = pointForIndex(pct+0.01);
		let angle = atan2(leftP.y - rightP.y, leftP.x - rightP.x) + PI;
		
		push();
			let p = pointForIndex(pct);
			//apply angle
			translate(p.x, p.y);
				rotate(angle);
			translate(-p.x, -p.y);
		
			text(textToWrite.charAt(i), p.x-charWidth/2, p.y);
		pop();
		
		pct += charWidth/2 * pixToAngularPct;
	}//for
}


