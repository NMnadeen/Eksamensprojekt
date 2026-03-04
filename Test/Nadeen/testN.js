let cols, rows;
let gridSize = 40; //kvadratform
let grid = [];
let cell;

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

