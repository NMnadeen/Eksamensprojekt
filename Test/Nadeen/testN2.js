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
}

function generateMaze(grid, stack, offsetX) {
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

function drawStartAndGoal() {
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

function index(r, c) { //Konvertering af r og c til array position
	if (r < 0 || c < 0 || r >= rows || c >= cols) { //Hvis "cellen" er udenfor grid
		return -1;
	}
	return r * cols + c; //Laver 2D koordinat til 1D array index
}

function removeWalls(a, b) { 
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

class Cell {
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