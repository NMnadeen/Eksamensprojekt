function setup() 
{
	createCanvas(880, 440);
	background(235)

	let buttonB = createButton('Restart');
	buttonB.size(100,30)
	buttonB.position(width/2-50, height/2-15);
    buttonB.mousePressed(changePageToStart);
}

function changePageToStart(){
	window.location.href = "startSkærm.html";
}