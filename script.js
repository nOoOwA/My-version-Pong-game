var canvas = document.getElementById("mainCanvas");
 var context = canvas.getContext("2d"); 
 
 var keys = []; 
 
 var width = 1200, height = 500,  speed = 6;
  
 
 var scorePlayer = 0;
 
 var scorePlayer2 = 0;
 
 var player = {
	 x:  60,
	 y: 40,
	 width:  10,
	 height: 90
 };
 
 var player2 = { 
	 x: 1000,
	 y: 40,
	 width: 10,
	 height: 90
 };
 
 var ball = {
	 x: 400,
	 y: 300,
	 width: 10,
	 height: 10
	 
 };

 var moveY = 4;
 
 
 var moveX = 4;
 
 
 
 var wall = {
	 x: 0,
	 y: 0
 };
 
 var center_wall = {
	 x: 580,
	 y: 0,
	 width: 5,
	 height: 700
 };
 
 
 window.addEventListener("keydown",  function(e){   
	keys[e.keyCode] = true; 
	}, false);
 window.addEventListener("keyup",  function(e){     
	delete keys[e.keyCode];
	}, false);
 
 
 
 function game(){
	 update();
	 render();
 }
 
 
 function update(){ //wszystko związane z mechanika gry 
 if(keys[38]) (player2.y-=speed);
 if(keys[40]) (player2.y+=speed);
	
if(keys[87]) (player.y-=speed);
if(keys[83]) (player.y+=speed);

 }

 
 function render(){  /*wszystko zwiazane z grafika*/
	 context.clearRect(0, 0, width, height); /* pozbawia ciagnacego sie "cienia" za graczem/przeciwnikiem/grafika */
	 
	 //player
		context.fillStyle = "white";
	 context.fillRect(player.x, player.y, player.width, player.height);
	 
	 //player2
		context.fillStyle = "white";
		context.fillRect(player2.x, player2.y, player2.width, player2.height);
		
		//ball
		context.fillStyle = "white";
		context.fillRect(ball.x, ball.y, ball.width, ball.height, ball.speed);
		
		//center_wall
		context.fillStyle = "white";
		context.fillRect(center_wall.x, center_wall.y, center_wall.width, center_wall.height);
		
		//score
		context.fillStyle = "red";
		context.font = "bold 30px helvetica"
		context.fillText(scorePlayer, 10, 30); /* po score jest podane miejsce w liczbach gdzie score ma byc na planszy */
		context.fillText(scorePlayer2, 1010, 30);
		
		// blokowanie ucieczki player po za górną krawędź canvas
		if (player.y < 0 ) {
			player.y = 0;
		}
		
		// blokowanie ucieczki player2 po za górną krawędź canvas
		if (player2.y < 0 ) {
			player2.y = 0;
		}
		
		//blokowanie ucieczki player po za dolną krawędź canvas
		if ( (player.y + player.height) > canvas.height) {
			player.y = (canvas.height - player.height);
		}
		
		//blokowanie ucieczki player2 po za dolną krawędź canvas
		if ( (player2.y + player2.height) > canvas.height) {
			player2.y = (canvas.height - player2.height);
		}
		
		//ruch piłki 
		ball.y = ball.y + moveY;
		
		ball.x = ball.x + moveX;
		
		
		//kolizja z niewidzialną ścianą i zmiana kierunku
		if (ball.y > (canvas.height - ball.height) ) {
			moveY =  -moveY;
		}
		
		if (ball.y < 0){
			moveY = -moveY;
		}
		
		
		if (ball.x > (canvas.width - ball.width) ){
			moveX = -moveX;
		}
		
		if (ball.x < 0){
			moveX = -moveX;
		}
		
//kolizja piłki z player
 if  (player.x < ball.x +ball.width 	&&
		player.x + player.width> ball.x   &&
		player.y<ball.y + ball.height      &&
		player.height + player.y > ball.y) {
		
		moveX = -moveX;
		}
	
	//kolizja piłki z player2
 if  (player2.x < ball.x +ball.width 	&&
		player2.x + player2.width> ball.x   &&
		player2.y<ball.y + ball.height      &&
		player2.height + player2.y > ball.y) {
		
		moveX = -moveX;
		}
	 
	}
 
 setInterval(function() { 
	game();}
	,1000/30)