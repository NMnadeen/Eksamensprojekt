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
			//print('x:',cell.getX(),'y:',cell.getY()) //print koordinater til alle cellers øverste venstre hjørne
		}
	}
	
	
}


function draw()
{
	background('gray')
	for (let i = 0; i<grid.length;i++)	{
		grid[i].show()
	}

}

class Cell{
	constructor(r,c)	{ //x er kolonner - y er rækker
		this.r=r;
		this.c=c;
		this.walls = [true,true,true,true];
	}

	getX(){ // Getter metode
		return this.c*gridSize
	}

	getY(){ // Getter metode
		return this.r*gridSize
	}

	show(){ //x er kolonner (vandret), y er rækker (lodret)
		let x = this.getX();
		let y = this.getY();
		
		//Linjerne tegnes systematisk fra toppen og højre om. 
		stroke(0);
		noFill();
		
		let coords = [	[x			,y			,x+gridSize	,y			],
						[x+gridSize	,y			,x+gridSize	,y+gridSize	],
						[x+gridSize	,y+gridSize	,x			,y+gridSize	],
						[x			,y+gridSize	,x			,y			]];

		for (let i = 0; i<grid.length; i++){
			for (let j = 0; j < coords.length; j++){
				if (this.walls[j]){
					line(...coords[j]) //Seperation af array
					//print(coords[j])
			}
			
		}
		}
		
		
		/*if (this.walls[0]){
		line(x			,y			,x+gridSize	,y			); // Top	
		}
		
		if (this.walls[1]){
			line(x+gridSize	,y			,x+gridSize	,y+gridSize	); // Højre	
		}
		
		if (this.walls[2]){
			line(x+gridSize	,y+gridSize	,x			,y+gridSize	); // Bund
		}
		
		if (this.walls[3]){
			line(x			,y+gridSize	,x			,y			); // Venstre	
		}
		
		//rect(x,y,gridSize,gridSize); //Hvis det skal være firkanter
	}*/

	
}
}