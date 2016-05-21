//**************** variable declarations ********************************
//**************** variable declarations ********************************
		var score2 = 0;
		var larva = [];

		var scoreBar2 = new Bar();

		//stage 2 background
		var backgroundImage = new Image();
		backgroundImage.src = "http://i.imgur.com/WzDBHhe.png";

	//**************** function definitions ********************************
	//**************** function definitions ********************************

		function larvaParticle(x, y){
			this.x = x;
			this.y = y;
			this.radius = 13;
			this.color = 'black';
			this.hungry = false;
		}


		//randomly initializes a number of larva
		function larva_system(x, y, xDist, yDist) {
		   	for (var i = 0; i <= y-1; i++) {
		   		for(var j = 0; j <= x-1; j++){
		      		larva.push(new larvaParticle(37+(xDist*j), 48+(yDist*i) ));
		      	}
		    }
		    	x = 5;
		      	y = 9;
		    for (i = 0; i <= y-1; i++){
		   		for(j = 0; j <= x-1; j++){
		      		larva.push(new larvaParticle(78+(xDist*j), 25+(yDist*i) ));
		      	}
		   	}  	
		}


		// sets a new random element of larva[] to the "hungry" state
		function feedLarva(iter){
			var it = getRandomIntInclusive(0, 99);

			larva[it].hungry = true;

			larva[iter].hungry = false;
			score2 += 1;
		}


		function stage2Update(){
			// player avatar follows the mouse
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

			for(var i=0;i<=larva.length-1;i++){
				//check for collisions and call feedLarva() on-collision
	            if( (checkPlayerParticleCollision(player,larva[i])==true)&&(larva[i].hungry==true) ){
	               feedLarva(i);
	            }

	            //check hunger state and set color accordingly
	            if(larva[i].hungry==true){
					larva[i].color='red';
				}else{
					larva[i].color='black';
				}
	        }

	        topDownBee.update();
		}


		function stage2Draw(){
			canvas.width = canvas.width;
			ctx.fillStyle = 'gold';
			ctx.fillRect(0, 0, width, height);

			ctx.drawImage(backgroundImage, -100, 0);

   			// draws the larva
   			for (var i = 0; i < larva.length; i++) {
			    var par = larva[i];
			    ctx.fillStyle = larva[i].color;
			    ctx.beginPath();
			    ctx.arc(par.x, par.y, par.radius, Math.PI * 2, false);
			    ctx.stroke();
			    ctx.fill();
		   	}

   			scoreBar2.draw(score2*25);

   			//draw Bee
   			topDownBee.draw(player.x, player.y);
		}



	//**************** initialization code ********************************
	//**************** initialization code ********************************

		
		// initialize a system of larvaParticle particles for stage2
		larva_system(6, 9, 83, 48);

		//initial state for stage2
		var it = getRandomIntInclusive(0, 99);
		larva[it].hungry = true;