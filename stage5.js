//**************** variable declarations ********************************
//**************** variable declarations ********************************

	var particles = [];
	var stems = [];

	var sources = new Array();
		sources.push('http://i.imgur.com/p83Pw13.png');
		sources.push('http://i.imgur.com/LkfveJv.png');
		sources.push('http://i.imgur.com/SsW8ulE.png');
		sources.push('http://i.imgur.com/ZpuJT8p.png');
		sources.push('http://i.imgur.com/8lcPXBr.png');

		var spacer = 1.0;

		var score5 = 0;


//**************** function definitions ********************************
//**************** function definitions ********************************

	function initProperties(varName, w, h, source, x, y){
		varName.width = w;
		varName.height = h;
		varName.src = sources[source];
		varName.X = x;
		varName.Y = y;
	}


	function stage5Update(){
		if(player.x != mouseXPos){
			if(Math.abs(player.x - mouseXPos) < player.speed){
			    player.x = mouseXPos;
			}
			else if(player.x > mouseXPos){
			    	player.x -= player.speed;
			}else{
			    player.x += player.speed;
			}
		}
			
		if(player.y != mouseYPos){
			if(Math.abs(player.y - mouseYPos) < player.speed){
			    player.y = mouseYPos;
			}
			if(player.y > mouseYPos){
			    player.y -= player.speed;
			}else{
			    player.y += player.speed;
			}
		}

		for(var i = 0;i < particles.length; i++){
			if(particles[i].X > -particles[i].width){
				particles[i].X -= 3;
			}else{
				particles[i].X = (canvas.width * 1.5) + particles[i].width;
				particles[i].Y = getRandomIntInclusive(200, 300);
				
				
				//if(score > highScore){
				//	highScore = score;
				//}
			}
		}

		  flyingBee.update();

	}


	function stage5Draw(){
		canvas.width = canvas.width;
		ctx.fillStyle = 'blue';
		ctx.fillRect(0,0,canvas.width,300);
		ctx.fillStyle = 'green';
		ctx.fillRect(0,300,canvas.width, canvas.height/2)
		  
		for(iter = 0; iter < particles.length; iter++){
			var par = particles[iter];
			ctx.drawImage(par, par.X, par.Y, par.width, par.height);
		}
			
		ctx.fillStyle = 'yellow';
		flyingBee.draw(player.x+2, player.y+5);
			
		//ctx.fillStyle = 'black';
		//ctx.strokeRect(player.x,player.y,player.width,player.height);
			
		ctx.font = "30px Verdana";
		ctx.fillText(score5, 5, 30);
			
		ctx.font = "10px Verdana";
		//ctx.fillText('High Score: ' + highScore, 5, 390);
	}



//**************** initialization code ********************************
//**************** initialization code ********************************


	var flower1 = new Image();
	initProperties(flower1,100,100,0,canvas.width * spacer, getRandomIntInclusive(200, 300));
	particles.push(flower1);
	spacer += .5;

	var flower2 = new Image();
	initProperties(flower2,100,100,1,canvas.width * spacer, getRandomIntInclusive(200, 300));
	particles.push(flower2);
	spacer += .5;

	var flower3 = new Image();
	initProperties(flower3,100,100,2,canvas.width * spacer, getRandomIntInclusive(200, 300));
	particles.push(flower3);
	spacer += .5;

	var flower4 = new Image();
	initProperties(flower4,100,100,3,canvas.width * spacer, getRandomIntInclusive(200, 300));
	particles.push(flower4);
	spacer += .5;

	var flower5 = new Image();
	initProperties(flower5,100,100,4,canvas.width * spacer, getRandomIntInclusive(200, 300));
	particles.push(flower5);
	spacer += .5;

	
	var flyingBee = new SpriteSheet("http://i.imgur.com/PoulRUl.png", 37, 30, 2, 2);