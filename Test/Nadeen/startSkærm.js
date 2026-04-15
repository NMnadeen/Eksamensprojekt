function setup() 
{
	createCanvas(880, 440);
	background(235)

	let buttonA = createButton('Start game');
    buttonA.position(width/2-width*2/8, height/2);
    buttonA.mousePressed(changePageToLvl1);
}

function changePageToLvl1(){
	//window.location.href = "samlettest.html";
}