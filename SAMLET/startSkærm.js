function setup() 
{
	createCanvas(880, 440);
	background(235)

	let buttonA = createButton('Start game');
	buttonA.size(100,30)
	buttonA.position(width/2-50, height/2-15);
    buttonA.mousePressed(changePageToLvl1);
}

function changePageToLvl1(){
	window.location.href = "samlettest.html";
}