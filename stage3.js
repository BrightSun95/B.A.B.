//**************** variable declarations ********************************
//**************** variable declarations ********************************

	var score3 = 0;
	var heldBoxIndex;
		
	var leftBees = [];
	var rightBees = [];
	var wax_array = [];

	var wax = new Wax(400, 430, 15, 15);


//**************** function definitions ********************************
//**************** function definitions ********************************

	function Wax(x, y, width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.held = false;
	}

	function Particle(x, y, radius, speed) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.speed = speed;
	}


	//maintains particles
	function leftBeesSystem(numParticles) {
		for (var i = 0; i < numParticles; i++) {
			leftBees.push(new Particle(0, Math.floor((Math.random()*350)+50), 10, 3));
		}
	}
		
	function rightBeesSystem(numParticles){
		for(var i = 0; i < numParticles; i++){
			rightBees.push(new Particle(500, Math.floor((Math.random()*350)+50), 10, -3));
		}
	}

	function wax_system(numParticles){
		for(var i = 0; i < numParticles; i++){
			wax_array.push(new Wax(130, 420, 15, 15));
			wax_array.push(new Wax(130*2, 420, 15, 15));
			wax_array.push(new Wax(130*3, 420, 15, 15));
		}
	}


function stage3Update(){
			//left to right
				for(var i = 0; i < leftBees.length; i++) {
					if(leftBees[i].x < canvas.width) {
						leftBees[i].x += leftBees[i].speed * 2;
					} else {
						//reset leftBees
						leftBees[i].y = Math.floor((Math.random()*350)+50);
						leftBees[i].x = 0;
					}
				}
				//right to left
				for(var i = 0; i < rightBees.length; i++){
					if(rightBees[i].x > 0){
						rightBees[i].x += rightBees[i].speed * 2;
					}else if(rightBees[i].x < 0){
						//reset
						rightBees[i].y = Math.floor((Math.random()*350)+50);
						rightBees[i].x = 500;
					}
				}

				//player movement
				if (player.x != mouseXPos) {
					if (Math.abs(player.x - mouseXPos) < player.speed) {
						player.x = mouseXPos;
				} else if (player.x > mouseXPos) {
					player.x -= player.speed;
				} else {
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

			for (var i = 0; i <= wax_system.length - 1; i++) {
				if (checkPlayerParticleCollision(player, leftBees[i]) == true) {
					//score3++;
				}
			}

			for(var i = 0; i < wax_array.length; i++){
				if(checkPlayerParticleCollision(player, wax_array[i]) == true && player.holding==false){
					player.holding = true;
					wax_array[i].held = true;
					heldBoxIndex = i;
				}
			}

			if(player.holding == true){
				wax_array[heldBoxIndex].x = player.x;
				wax_array[heldBoxIndex].y = player.y
			}

			// dropping wax
			for(var i = 0; i < wax_array.length; i++){
				if(player.holding == true && wax_array[i].x > 175 && wax_array[i].x < 325 && wax_array[i].y > 0 && wax_array[i].y < 75){
					if(i==0 && wax_array[i].held==true){
						wax_array[i].x = 200;
						wax_array[i].y = 10;
						wax_array[i].held=false;
						player.holding = false;
						score3++;
					}if(i==1 && wax_array[i].held==true){
						wax_array[i].x = 185;
						wax_array[i].y = 30;
						wax_array[i].held=false;
						player.holding = false;
						score3++;
					}if(heldBoxIndex==2 && wax_array[i].held==true){
						wax_array[i].x = 215;
						wax_array[i].y = 30;
						wax_array[i].held=false;
						player.holding = false;
						score3++;
					}
				}
			}		
			// update player sprite
	        topDownBee.update();
		}

		function stage3Draw(){
			canvas.width = canvas.width;
			ctx.fillStyle = 'gold';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			//draw drop off area
			ctx.fillStyle = 'pink';
			ctx.fillRect(175, 0, 75, 75);
				
			//draw wax
			for(var i = 0; i < wax_array.length; i++){
					ctx.fillStyle = 'red';
					ctx.fillText(i,wax_array[i].x,wax_array[i].y);
					ctx.fillRect(wax_array[i].x, wax_array[i].y, wax_array[i].width, wax_array[i].height);
			}
			
			for (var i = 0; i < leftBees.length; i++) {
				var par = leftBees[i];

				//draw bees going right
				ctx.fillStyle = 'white';
				ctx.beginPath();
				ctx.arc(par.x, par.y, par.radius, Math.PI * 2, false);
				ctx.stroke();
				ctx.fill();
			}
			for(var i = 0; i < rightBees.length; i++){
				var par2 = rightBees[i];
				
				//draw bees going left
				ctx.fillStyle = 'white';
				ctx.beginPath();
				ctx.arc(par2.x, par2.y, par2.radius, Math.PI * 2, false);
				ctx.stroke();
				ctx.fill();
			}
			// draw player
			topDownBee.draw(player.x, player.y);
		}


//**************** initialization code ********************************
//**************** initialization code ********************************

	var scoreBar = new Bar();

	leftBeesSystem(3);
	rightBeesSystem(3);
	wax_system(1);