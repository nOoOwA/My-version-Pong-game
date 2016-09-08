var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");

var keys = [];

var width = 1200, height = 500, speed = 6;

var scorePlayer1 = 0;
var scorePlayer2 = 0;

var moveY = 4;
var moveX = 4;

var endWall1 = {
	x: 100,
	y: 0,
	width: 1,
	height: 500
};

var endWall2 = {
	x: 1100,
	y: 0,
	width: 1,
	height: 500
};

var player1 = {
	x: 200,
	y: 40,
	width: 10,
	height: 80
};

var player2 = {
	x: 1000,
	y: 40,
	width: 10,
	height: 80
};

var ball = {
    x: 600,
    y: 250,
    width: 10,
    height: 10
};

var centerLine = {
    x: 580,
    y: 0,
    width: 5,
    height: 700
};

window.addEventListener("keydown", function (e) {
	keys[e.keyCode] = true;
}, false);
window.addEventListener("keyup", function (e) {
	delete keys[e.keyCode];
}, false);


function game(){
	update();
	render();
}


function update(){
	if (keys[87]) (player1.y -= speed);
	if(keys[83]) (player1.y += speed);
	
	if (keys[38]) (player2.y -= speed);
	if (keys[40]) (player2.y += speed);
}

function render(){
	context.clearRect(0, 0, width, height);
	
	//player1
	context.fillStyle = "white";
	context.fillRect(player1.x, player1.y, player1.width, player1.height);

	//player2
	context.fillStyle = "white";
	context.fillRect(player2.x, player2.y, player2.width, player2.height);

	//ball
	context.fillStyle = "yellow";
	context.fillRect(ball.x, ball.y, ball.width, ball.height, ball.speed);

	//centerLine
	context.fillStyle = "white";
	context.fillRect(centerLine.x, centerLine.y, centerLine.width, centerLine.height);

	//score
	context.fillStyle = "yellow";
	context.font = "bold 30px helvetica"
	context.fillText(scorePlayer1, 10, 30); /* po score jest podane miejsce w liczbach gdzie score ma byc na planszy */
	context.fillText(scorePlayer2, 1170, 30);
	
// blokowanie ucieczki player1 po za górną krawędź canvas
 if (player1.y < 0) {
      player1.y = 0;
    }

// blokowanie ucieczki player2 po za górną krawędź canvas
   if (player2.y < 0) {
        player2.y = 0;
    }

//blokowanie ucieczki player po za dolną krawędź canvas
if ((player1.y + player1.height) > canvas.height) {
      player1.y = (canvas.height - player1.height);
    }

//blokowanie ucieczki player2 po za dolną krawędź canvas
 if ((player2.y + player2.height) > canvas.height) {
       player2.y = (canvas.height - player2.height);
    }

//ruch piłki 
ball.y = ball.y + moveY;
ball.x = ball.x + moveX;


//kolizja z niewidzialną ścianą i zmiana kierunku
 if (ball.y > (canvas.height - ball.height)) {
      moveY = -moveY;
    }

if (ball.y < 0) {
     moveY = -moveY;
    }


if (ball.x > (canvas.width - ball.width)) {
        moveX = -moveX;
    }

if (ball.x < 0) {
        moveX = -moveX;
    }


//kolizja piłki z player
if (player1.x < ball.x + ball.width &&
    player1.x + player1.width > ball.x &&
     player1.y < ball.y + ball.height &&
     player1.height + player1.y > ball.y) {
		 
	 moveX = -moveX;
    }

//kolizja piłki z player2
if (player2.x < ball.x + ball.width &&
    player2.x + player2.width > ball.x &&
     player2.y < ball.y + ball.height &&
     player2.height + player2.y > ball.y) {

     moveX = -moveX;
    }
	
//kolizja z gory 
if ( ball.y  < player1.y) {
	console.log(4);
	//moveY = -moveY;
} 

//gdy piłka wyjdzie po za endWall to pojawia się w nowym miejscu
//a gracz zdobywa punkt
if (ball.x < endWall1.x) {
	ball.x = 800 ;
	ball.y = 100;
	scorePlayer2 = scorePlayer2 + 1;
}

if (ball.x > endWall2.x) {
	ball.x = 400;
	ball.y = 100;
	scorePlayer1 = scorePlayer1 + 1;
}

}

setInterval(function () {
game();} , 1000 / 60)