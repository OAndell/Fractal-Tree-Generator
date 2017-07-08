var angle;
var randomness;
var randomnessL;

var angleSlider;
var randomLSlider;
var randomASlider;

var backgroundRSlider;
var backgroundGSlider;
var backgroundBSlider;

var startRSlider;
var startGSlider;
var startBSlider;

var changeRSlider;
var changeGSlider;
var changeBSlider;

var sliderWidth = '100px';

var minWidth = 0.1;
var minLenght = 20;

var widthChangeFactor = 0.67;
var lenghtChangeFactor = 0.82;


function setup() {
	var canvas = createCanvas(800, 850);
	textSize(13);
	button = createButton('Generate Tree');
	button.position(15,height-20);
	button.mousePressed(drawTree);
	
	//math sliders
	angleSlider = createSlider(canvas.x + 0, PI/2, PI/8, 0.001).style('width', sliderWidth);
	angleSlider.position( 10, height-110);
	randomASlider = createSlider(0, PI/8, 0.2, 0.001).style('width', sliderWidth);
	randomASlider.position(10, height-90);
	randomLSlider = createSlider(0, 8, 5).style('width', sliderWidth);
	randomLSlider.position(10, height-70);
	
	//backgroundSliderss
	backgroundRSlider = createSlider(0, 255, 40, 1).style('width', sliderWidth);
	backgroundRSlider.position(270,height-110)
	backgroundGSlider = createSlider(0, 255, 40, 1).style('width', sliderWidth);
	backgroundGSlider.position(270,height-90)
	backgroundBSlider = createSlider(0, 255, 40).style('width', sliderWidth);
	backgroundBSlider.position(270,height-70);
	
	//start color sliders
	startRSlider =  createSlider(0, 255, 255, 1).style('width', sliderWidth);
	startRSlider.position(450,height-110)
	startGSlider =  createSlider(0, 255, 255, 1).style('width', sliderWidth);
	startGSlider.position(450,height-90)
	startBSlider =  createSlider(0, 255, 255, 1).style('width', sliderWidth);
	startBSlider.position(450,height-70)
	
	//color change factor slider
	changeRSlider =  createSlider(0.01, 2, 1, 0.01).style('width', sliderWidth);
	changeRSlider.position(635,height-110)
	changeGSlider =  createSlider(0.01, 2, 0.9, 0.01).style('width', sliderWidth);
	changeGSlider.position(635,height-90)
	changeBSlider =  createSlider(0.01, 2, 1, 0.01).style('width', sliderWidth);
	changeBSlider.position(635,height-70)
	
	drawTree();
}

function draw(){
	noStroke();
	fill(150);
	rect(0, height-150,800,150);
	fill(0)
	text("Math", angleSlider.x , height - 130);
	text("Angle: " + round(degrees(angleSlider.value())) + "°", angleSlider.x + angleSlider.width, angleSlider.y + 10);
	text("Angle variation: " + round(degrees(randomASlider.value()))+ "°", randomASlider.x + randomASlider.width, randomASlider.y + 10);
	text("Lenght variation: " + randomLSlider.value(), randomLSlider.x + randomLSlider.width, randomLSlider.y + 10);
	
	text("Background", backgroundRSlider.x , height - 130);
	text("R: " + backgroundRSlider.value(), backgroundRSlider.x + backgroundRSlider.width, backgroundRSlider.y + 10);
	text("G: " + backgroundGSlider.value(), backgroundGSlider.x + backgroundGSlider.width, backgroundGSlider.y + 10);
	text("B: " + backgroundBSlider.value(), backgroundBSlider.x + backgroundBSlider.width, backgroundBSlider.y + 10);
	
	fill(backgroundRSlider.value(),backgroundGSlider.value(),backgroundBSlider.value());
	rect(backgroundRSlider.x, backgroundBSlider.y + 20 , backgroundBSlider.width, 30,);
	fill(0);
	
	text("Start Color", startRSlider.x  , height - 130);
	text("R: " + startRSlider.value(), startRSlider.x + startRSlider.width, startRSlider.y + 10);
	text("G: " + startGSlider.value(), startGSlider.x + startGSlider.width, startGSlider.y + 10);
	text("B: " + startBSlider.value(), startBSlider.x + startBSlider.width, startBSlider.y + 10);
	
	fill(startRSlider.value(),startGSlider.value(),startBSlider.value());
	rect(startRSlider.x, startBSlider.y + 20 , startBSlider.width, 30,);
	fill(0);
	
	text("Change Factor", changeRSlider.x  , height - 130);
	text("R: " + changeRSlider.value(), changeRSlider.x + changeRSlider.width, changeRSlider.y + 10);
	text("G: " + changeGSlider.value(), changeGSlider.x + changeGSlider.width, changeGSlider.y + 10);
	text("B: " + changeBSlider.value(), changeBSlider.x + changeBSlider.width, changeBSlider.y + 10);
	
	drawChangeExample(startRSlider.value(), startGSlider.value(), startBSlider.value() ,changeRSlider.value(),changeGSlider.value(),changeBSlider.value());
}

function drawChangeExample(r,g,b, factorR, factorG, factorB){
	for (i = changeRSlider.x; i < changeRSlider.x + changeRSlider.width; i+=5) { 
		fill(r,g,b);
		rect(i, changeBSlider.y + 20, 5, 30);
		r = r*factorR;
		g = g*factorG;
		b = b*factorB;
	}
}

function drawTree() {
	background(backgroundRSlider.value(),backgroundGSlider.value(), backgroundBSlider.value());
	noStroke();
	angle = angleSlider.value();
	randomness = randomASlider.value();
	randomnessL = randomLSlider.value();
	translate(width/2, height-150);
	branch(100, 10, color(startRSlider.value(),startGSlider.value(),startBSlider.value()));
}

function branch(len, width, c) {
	if(width < minWidth){
		width = minWidth;
	}
	len = len + random(-randomnessL, randomnessL);
	stroke(c);
	strokeWeight(width);
	line(0, 0, 0, -len);
	translate(0, -len);
	c = color(red(c)*changeRSlider.value(), green(c)*changeGSlider.value(), blue(c)*changeBSlider.value());
	if (len > minLenght) {
		push();
		rotate(angle + random(-randomness, randomness) );
		branch(len * lenghtChangeFactor, width*widthChangeFactor, c);
		pop();
		push();
		rotate(-angle + random(-randomness, randomness));
		branch(len * lenghtChangeFactor , width*widthChangeFactor, c);
		pop();
	}
	else{
		fill(c)
		ellipse(0,0,3,5);
	}
}


