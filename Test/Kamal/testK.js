let cols, rows;
let gridSize = 40; //kvadratform
let grid = [];
let cell;

//Temporary start position for player 1 (x1,y1) og player 2 (x2,y2)
let startPosx1 = 40;
let startPosx2 = 40;
let startPosy1 = 40;
let startPosy2 = 40;

let x1 = startPosx1;
let x2 = startPosx2;
let y1 = startPosy1;
let y2 = startPosy2;

//variabler til player controls og andet player relateret
let y1Speed = 0;
let y2Speed = 0;

let normalSpeed = 2; //hastighed for bevægelsen af player 1 og 2

let playerSize = (20,20); 


function setup() 
{
	createCanvas(440, 440);
	background('gray')
	cols = width/gridSize;
	rows = height/gridSize;

	for (let r = 0; r < rows;r++){
		for (let c = 0; c < cols; c++){
			cell = new Cell(r,c) //Laver objekt for hver celle
			grid.push(cell)
		}
	}
	
	print(grid)

}

function draw()
{
	background('gray')
	for (let i = 0; i<grid.length;i++){
		grid[i].show(cell)
		
	}
	playerControls()
	player1og2Draw()
	skærmBarriers()
}

class Cell{
	constructor(r,c){ //x er rækker - y er kolonner
		this.r=r
		this.c=c
	}

	show(){ 
		let x = this.r*gridSize;
		let y = this.c*gridSize;
		stroke(0);
		noFill();
		rect(x,y,gridSize,gridSize);
	}
}


//Player controls for movement
function playerControls(){
	if(keyIsDown(LEFT_ARROW)){
		x1-=normalSpeed;
	} 
	if(keyIsDown(RIGHT_ARROW)){
		x1+=normalSpeed;
	}
	if(keyIsDown(UP_ARROW)){
		y1-=normalSpeed;
	}
	if(keyIsDown(DOWN_ARROW)){
		y1+=normalSpeed;
	}
	//Player 2 controls
	if(keyIsDown(65)){ // keycodeA
		x2-=normalSpeed;
	} 
	if(keyIsDown(68)){ //keycodeD
		x2+=normalSpeed;
	}
	if(keyIsDown(87)){ //keycodeW
		y2-=normalSpeed;
	}
	if(keyIsDown(83)){//keycodeS
		y2+=normalSpeed;
	}
}

function player1og2Draw(){ //tegner player 1 og 2
	//player1
	fill('blue')
	stroke('darkblue')
	rect(x1,y1,20,20)
	//player2
	fill('red')
	stroke('darkred')
	rect(x2,y2,20,20)
}

// skærm barrier
function hold(v, min, max){ //holder en værdi mellem min og max
  return Math.min(Math.max(v, min), max); //hvis < min returner min hvis > max retuner max ellers returner v
}

function skærmBarriers(){ //sørger for at begge spiller bliver inden for canvas
  x1 = hold(x1, 0, width  - playerSize); //hold player 1 x1 mellem 0 og width af skærmen
  y1 = hold(y1, 0, height - playerSize);

  x2 = hold(x2, 0, width  - playerSize);
  y2 = hold(y2, 0, height - playerSize);
}