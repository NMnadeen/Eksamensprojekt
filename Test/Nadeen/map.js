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
	
	//Manuel map generator - SPAWN række 1, kolonne 6
	//Række 1
	grid[0].setWalls([true,false,false,true])
	grid[1].setWalls([true,false,true,false])
	grid[2].setWalls([true,false,true,false])
	grid[3].setWalls([true,false,true,false])
	grid[4].setWalls([true,false,true,false])
	grid[5].setWalls([false,false,true,false])
	grid[6].setWalls([true,false,true,false])
	grid[7].setWalls([true,true,false,false])
	grid[8].setWalls([true,false,false,true])
	grid[9].setWalls([true,false,true,false])
	grid[10].setWalls([true,true,false,false])

	// Række 2
	grid[11].setWalls([false,true,false,true])
	grid[12].setWalls([true,true,false,true])
	grid[13].setWalls([true,false,false,true])
	grid[14].setWalls([true,true,false,false])
	grid[15].setWalls([true,false,false,true])
	grid[16].setWalls([true,false,true,false])
	grid[17].setWalls([true,true,false,false])
	grid[18].setWalls([false,false,true,true])
	grid[19].setWalls([false,true,true,false])
	grid[20].setWalls([true,false,false,true])
	grid[21].setWalls([false,true,false,false])
	
	// Række 3
	grid[22].setWalls([false,true,true,true])
	grid[23].setWalls([false,false,false,true])
	grid[24].setWalls([false,true,true,false])
	grid[25].setWalls([false,false,true,true])
	grid[26].setWalls([false,true,true,false])
	grid[27].setWalls([true,false,false,true])
	grid[28].setWalls([false,true,false,false])
	grid[29].setWalls([true,false,false,true])
	grid[30].setWalls([true,true,false,false])
	grid[31].setWalls([false,true,false,true])
	grid[32].setWalls([false,true,true,true])

	// Række 4
	grid[33].setWalls([true,false,false,true])
	grid[34].setWalls([false,true,true,false])
	grid[35].setWalls([true,false,true,true])
	grid[36].setWalls([true,false,true,false])
	grid[37].setWalls([true,false,true,false])
	grid[38].setWalls([false,true,false,false])
	grid[39].setWalls([false,true,false,true])
	grid[40].setWalls([false,true,false,true])
	grid[41].setWalls([false,true,false,true])
	grid[42].setWalls([false,false,true,true])
	grid[43].setWalls([true,true,false,false])

	// Række 5
	grid[44].setWalls([false,false,true,true])
	grid[45].setWalls([true,false,true,false])
	grid[46].setWalls([true,true,false,false])
	grid[47].setWalls([true,false,false,true])
	grid[48].setWalls([true,true,false,false])
	grid[49].setWalls([false,true,false,true])
	grid[50].setWalls([false,false,true,true])
	grid[51].setWalls([false,true,true,false])
	grid[52].setWalls([false,true,false,true])
	grid[53].setWalls([true,false,false,true])
	grid[54].setWalls([false,true,true,false])

	// Række 6
	/*
	grid[55].setWalls([true,false,true,false])
	grid[56].setWalls([true,false,true,false])
	grid[57].setWalls([true,false,true,false])
	grid[58].setWalls([false,false,true,false])
	grid[59].setWalls([true,false,true,false])
	grid[60].setWalls([true,false,true,false])
	grid[61].setWalls([false,false,true,false])
	grid[62].setWalls([true,false,true,false])
	grid[63].setWalls([true,false,true,false])
	grid[64].setWalls([true,false,true,false])
	grid[65].setWalls([false,false,true,false])

	// Række 7
	grid[66].setWalls([true,false,true,false])
	grid[67].setWalls([true,false,true,false])
	grid[68].setWalls([false,false,true,false])
	grid[69].setWalls([true,false,true,false])
	grid[70].setWalls([true,false,true,false])
	grid[71].setWalls([true,false,true,false])
	grid[72].setWalls([false,false,true,false])
	grid[73].setWalls([true,false,true,false])
	grid[74].setWalls([true,false,true,false])
	grid[75].setWalls([false,false,true,false])
	grid[76].setWalls([true,false,true,false])

	// Række 8
	grid[77].setWalls([true,false,true,false])
	grid[78].setWalls([true,false,true,false])
	grid[79].setWalls([false,false,true,false])
	grid[80].setWalls([true,false,true,false])
	grid[81].setWalls([true,false,true,false])
	grid[82].setWalls([false,false,true,false])
	grid[83].setWalls([true,false,true,false])
	grid[84].setWalls([true,false,true,false])
	grid[85].setWalls([true,false,true,false])
	grid[86].setWalls([false,false,true,false])
	grid[87].setWalls([true,false,true,false])

	// Række 9
	grid[88].setWalls([true,false,true,false])
	grid[89].setWalls([false,false,true,false])
	grid[90].setWalls([true,false,true,false])
	grid[91].setWalls([true,false,true,false])
	grid[91].setWalls([true,false,true,false])
	grid[92].setWalls([false,false,true,false])
	grid[93].setWalls([true,false,true,false])
	grid[94].setWalls([true,false,true,false])
	grid[95].setWalls([false,false,true,false])
	grid[96].setWalls([true,false,true,false])
	grid[97].setWalls([true,false,true,false])
	grid[98].setWalls([true,false,true,false])

	//Række 10
	grid[99].setWalls([false,false,true,false])
	grid[100].setWalls([true,false,true,false])
	grid[101].setWalls([true,false,true,false])
	grid[102].setWalls([false,false,true,false])
	grid[103].setWalls([true,false,true,false])
	grid[104].setWalls([true,false,true,false])
	grid[105].setWalls([true,false,true,false])
	grid[103].setWalls([false,false,true,false])
	grid[104].setWalls([true,false,true,false])
	grid[105].setWalls([true,false,true,false])
	grid[106].setWalls([false,false,true,false])
	grid[107].setWalls([true,false,true,false])
	grid[108].setWalls([true,false,true,false])
	grid[109].setWalls([true,false,true,false])

	//Række 11
	grid[110].setWalls([false,false,true,false])
	grid[111].setWalls([true,false,true,false])
	grid[112].setWalls([true,false,true,false])
	grid[113].setWalls([false,false,true,false])
	grid[114].setWalls([true,false,true,false])
	grid[115].setWalls([true,false,true,false])
	grid[116].setWalls([true,false,true,false])
	grid[117].setWalls([false,false,true,false])
	grid[118].setWalls([true,false,true,false])
	grid[119].setWalls([true,false,true,false])
	grid[120].setWalls([false,false,true,false])
	grid[121].setWalls([true,false,true,false])*/
	
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

	setWalls(walls){
		this.walls = walls
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