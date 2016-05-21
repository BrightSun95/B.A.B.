//**************** variable declarations ********************************
	//**************** variable declarations ********************************
		var score1 = 0;
		var gunks  = [];

		var scoreBar1 = new Bar();


	//**************** function definitions ********************************
	//**************** function definitions ********************************

		// draws a hexagon
    	function drawHex(width, height, offset){
    		ctx.fillStyle = '#e6b800';
			ctx.beginPath();
			ctx.moveTo(width/4, offset);
			ctx.lineTo(3*width/4,offset);
			ctx.lineTo(width-offset, height/2);
			ctx.lineTo(3*width/4, height-offset);
			ctx.lineTo(width/4, height-offset);
			ctx.lineTo(offset, height/2);
			ctx.closePath();
			ctx.fill();
			ctx.strokeStyle='black';
			ctx.stroke();
    	}

    	// gunk particle definition
    	function gunkParticle(x, y){
		   this.x = x;
		   this.y = y;
		   this.radius = Math.random()*5;
		}

		// initializes a number of gunks
		function gunk_system(numParticles) {
		   for (var i = 0; i <= numParticles; i++) {
		      gunks.push(new gunkParticle(Math.random()*canvas.width, Math.random()*canvas.height));
		   }
		}

		function stage1Update(){
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
			for(var i=0;i<=gunks.length-1;i++){
	            if(checkPlayerParticleCollision(player,gunks[i])==true){
	               gunks[i].x=width-5;
	               score1 += 1;
	            }
	        }

	        // update player sprite
	        topDownBee.update();
		}

		function stage1Draw(){
			canvas.width = canvas.width;
			ctx.fillStyle = 'gold';
			ctx.fillRect(0, 0, width, height);

			//background
			drawHex(width, height, 4);

			// draw player sprite
  			topDownBee.draw(player.x, player.y);


   			// draws the gunk
   			for (var i = 0; i < gunks.length; i++) {
			    var par = gunks[i];
			    ctx.fillStyle = 'black';
			    ctx.beginPath();
			    ctx.arc(par.x, par.y, par.radius, Math.PI * 2, false);
			    ctx.stroke();
			    ctx.fill();
		   	}

		   	scoreBar1.draw(score1*8);
		}



	//**************** initialization code ********************************
	//**************** initialization code ********************************

		// initialize a system of gunkParticle particles for stage1
	    gunk_system(100);