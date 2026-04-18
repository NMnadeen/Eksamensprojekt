//Labyrint generator (2 forskellige labyrinter)
let gridSize = 40;

//Antal kolonner og rækker pr. halvdel af canvas
let cols, rows;

//VENSTRE labyrint
let leftGrid = [];  //Alle celler
let leftCurrent;    //Nuværende celle
let leftStack = []; //Til backtracking

//HØJRE labyrint
let rightGrid = [];  //Alle celler
let rightCurrent;    //Nuværende celle
let rightStack = []; //Til backtracking

//Temporary start position for player 1 (x1,y1) og player 2 (x2,y2)
let startPosx1 = 850;
let startPosx2 = 10;
let startPosy1 = 10;
let startPosy2 = 10;

let x1 = startPosx1;
let x2 = startPosx2;
let y1 = startPosy1;
let y2 = startPosy2;

//variabler til player controls og andet player relateret
let y1Speed = 0;
let y2Speed = 0;

let normalSpeed = 2; //hastighed for bevægelsen af player 1 og 2

let playerSize = (20,20); 

// Gemmer spillernes gamle positioner før de flytter sig (til barriers)
let oldX1, oldY1, oldX2, oldY2;

//player png billede
let playerImg1;
let playerimg2;

function setup() {
	createCanvas(880, 440);

	cols = (width / 2) / gridSize; //Canvas deles i 2, da der er to labyrinter
	rows = height / gridSize;

	//Lav venstre labyrint
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			leftGrid.push(new Cell(r, c));
		}
	}

	//Lav højre labyrint
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			rightGrid.push(new Cell(r, c));
		}
	}

	leftCurrent = leftGrid[0];
	rightCurrent = rightGrid[0];
}

function draw() {
	background(180);

	//Generer venstre maze
	generateMaze(leftGrid, leftStack, 0);

	//Generer højre maze
	generateMaze(rightGrid, rightStack, width / 2);

	drawStartAndGoal();

	oldX1 = x1;
	oldY1 = y1;
	oldX2 = x2;
	oldY2 = y2;

	playerControls()
	skærmBarriers()

	// tjekker om spiller 1 er gået ind i en væg
	let p1 = wallBarrierForPlayer(x1, y1, oldX1, oldY1);
	x1 = p1.x;
	y1 = p1.y;

	// tjekker om spiller 2 er gået ind i en væg
	let p2 = wallBarrierForPlayer(x2, y2, oldX2, oldY2);
	x2 = p2.x;
	y2 = p2.y;

	checkWin()
	player1og2Draw()
}

//Player controls for movement
function playerControls(){ - Kamal
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

function preload() { - Kamal
	playerImg1 = loadImage("blob1.png");
	playerImg2 = loadImage("blob2.png");
}

function player1og2Draw(){ //tegner player 1 og 2 - Kamal
	image(playerImg1, x1, y1, 20, 20);
	image(playerImg2, x2, y2, 20, 20);
}

// skærm barrier
function hold(v, min, max){ //holder en værdi mellem min og max - Kamal
  return Math.min(Math.max(v, min), max); //hvis < min returner min hvis > max retuner max ellers returner v
}

function skærmBarriers(){ //sørger for at begge spiller bliver inden for canvas - Kamal
  x1 = hold(x1, 0, width  - playerSize); //hold player 1 x1 mellem 0 og width af skærmen
  y1 = hold(y1, 0, height - playerSize);

  x2 = hold(x2, 0, width  - playerSize);
  y2 = hold(y2, 0, height - playerSize);
}

// BARRIER KODE
// Finder hvilken celle spilleren er i ud fra spillerens position
function getCellIndexFromPlayer(px, py){ // - nadeen
  let centerX = px + 10;
  let centerY = py + 10;

  if (centerX >= width / 2) {
    centerX -= width / 2;
  }

  let c = floor(centerX / gridSize);
  let r = floor(centerY / gridSize);

  c = constrain(c, 0, cols - 1);
  r = constrain(r, 0, rows - 1);

  return r * cols + c;
}

// Tjekker om en spiller prøver at gå ind i en væg
function wallBarrierForPlayer(px, py, oldX, oldY){ // - kamal

  let grid = px < width / 2 ? leftGrid : rightGrid;

  let index = getCellIndexFromPlayer(px, py);
  let currentCell = grid[index];

  let localX = (px + 10) - (currentCell.getX() + (px < width / 2 ? 0 : width / 2));
  let localY = (py + 10) - currentCell.getY();

  if(currentCell.walls[0] && localY < 10){
    py = oldY;
  }

  if(currentCell.walls[1] && localX > gridSize - 10){
    px = oldX;
  }

  if(currentCell.walls[2] && localY > gridSize - 10){
    py = oldY;
  }

  if(currentCell.walls[3] && localX < 10){
    px = oldX;
  }

  return {x: px, y: py};
}



function generateMaze(grid, stack, offsetX) { //- nadeen
	let current;

	//Vælg current celle
	if (offsetX === 0) {
		current = leftCurrent;
	} else {
		current = rightCurrent;
	}

	current.visited = true; //Marker celle som visited

	let next = current.checkNeighbours(grid); //Find tilfældig ubesøgt nabo

	if (next) { //Hvis nabo findes
		next.visited = true; //Market nabo som besøgt

		stack.push(current); //Gem current som stack (der er mulighed for at gå tilbage hvis nødvendigt)

		removeWalls(current, next); //Fjern væg mellem current og next

		current = next; //Gå videre til næste celle
	}
	else if (stack.length > 0) {
		current = stack.pop(); //Hvis ingen nabo findes gå tilbage til sidste celle
	}

	//Gem tilbage
	if (offsetX === 0) {
		leftCurrent = current;
	} else {
		rightCurrent = current;
	}

	//Tegn maze
	for (let i = 0; i < grid.length; i++) {
		grid[i].show(offsetX);
	}
}

function drawStartAndGoal() { // - nadeen
	noStroke();

	//VENSTRE start
	fill(140, 173, 212);
	rect(0, 0, gridSize, gridSize);

	//VESNTRE mål (nederst højre)
	fill(168, 207, 153);
	rect(width / 2 - gridSize, height - gridSize, gridSize, gridSize);

	//HØJRE start (øverst højre)
	fill(140, 173, 212);
	rect(width - gridSize, 0, gridSize, gridSize);

	//HØJRE mål (nederst venstre)
	fill(168, 207, 153);
	rect(width / 2, height - gridSize, gridSize, gridSize);
}

function index(r, c) { //Konvertering af r og c til array position - nadeen
	if (r < 0 || c < 0 || r >= rows || c >= cols) { //Hvis "cellen" er udenfor grid
		return -1;
	}
	return r * cols + c; //Laver 2D koordinat til 1D array index
}

function removeWalls(a, b) { //- nadeen
	let x = a.c - b.c; //Sammenlign kolonner
	let y = a.r - b.r; //Sammenlign rækker

	//Venstre og højre 
	if (x === 1) {
		a.walls[3] = false;
		b.walls[1] = false;
	}
	else if (x === -1) {
		a.walls[1] = false;
		b.walls[3] = false;
	}

	//Top og bund
	if (y === 1) {
		a.walls[0] = false;
		b.walls[2] = false;
	}
	else if (y === -1) {
		a.walls[2] = false;
		b.walls[0] = false;
	}
}

class Cell { //- nadeen
	constructor(r, c) {
		this.r = r;
		this.c = c;
		this.walls = [true, true, true, true];
		this.visited = false;
	}

	checkNeighbours(grid) {
		let neighbors = [];

		let top 	= 	grid[index(this.r - 1, this.c	 )];
		let right 	= 	grid[index(this.r	 , this.c + 1)];
		let bottom 	= 	grid[index(this.r + 1, this.c	 )];
		let left 	= 	grid[index(this.r	 , this.c - 1)];

		//Hvis nabocellerne ikke har været besøgt, push dem i neighbours liste
		if (top    && !top.visited) 	 	neighbors.push(top)	  ;
		if (right  && !right.visited) 		neighbors.push(right) ;
		if (bottom && !bottom.visited)  	neighbors.push(bottom);
		if (left   && !left.visited) 	  	neighbors.push(left)  ;

		//Hvis der er naboer, vælg en tilfældig nabo
		if (neighbors.length > 0) {
			let rand = floor(random(neighbors.length));
			return neighbors[rand];
		}

		return undefined;
	}

	getX() {
		return this.c * gridSize;
	}

	getY() {
		return this.r * gridSize;
	}

	show(offsetX = 0) { //Forskydning
		let x = this.getX() + offsetX;
		let y = this.getY();

		if (this.visited) {
			noStroke();	
			fill(220);
			rect(x, y, gridSize, gridSize);
		}

		stroke(0);
		if (this.walls[0]) line(x			, y			  , x + gridSize, y			  );
		if (this.walls[1]) line(x + gridSize, y			  , x + gridSize, y + gridSize);
		if (this.walls[2]) line(x + gridSize, y + gridSize, x			, y + gridSize);
		if (this.walls[3]) line(x			, y + gridSize, x			, y			  );
	}
} 

//slutskærm 
function checkWin() { // Kamal
	let p1CenterY = y1 + 10;

	let p2CenterX = x2 + 10;
	let p2CenterY = y2 + 10;

	// Player 1 skal være i HØJRE grønne felt
	let player1OnGoal =
		p1CenterX >= width / 2 &&
		p1CenterX < width / 2 + gridSize &&
		p1CenterY >= height - gridSize &&
		p1CenterY < height;

	// Player 2 skal være i VENSTRE grønne felt
	let player2OnGoal =
		p2CenterX >= width / 2 - gridSize &&
		p2CenterX < width / 2 &&
		p2CenterY >= height - gridSize &&
		p2CenterY < height;

	if (player1OnGoal && player2OnGoal) {
		window.location.href = "slutSkærm.html";
	}
}