//**************** variable declarations ********************************
//**************** variable declarations ********************************

	var score4 = 0;
	var bees = [];
	var projectileBees = [];
	var enemies = [];

	var enemycd;
	var enemymaxcd = 25;
	enemycd = enemymaxcd;
	   

	var hiveCenterX = 200;
	var hiveCenterY = 200;

    // initialize new sprite for stages 1-3
    var swarmBeeSprite = new SpriteSheet("http://i.imgur.com/ou0r32L.png", 10, 10, 10, 2);
    var shotBeeSprite = new SpriteSheet("http://i.imgur.com/ou0r32L.png", 10, 10, 4, 2);

    canvas.addEventListener("mousedown", shootBee);

//**************** function definitions ********************************
//**************** function definitions ********************************

	function BeeSwarm(x, y){
	    this.x = x;
		this.y = y;
		this.offsetX = x;
		this.offsetY = y;
		this.speed = 5;
	}

	function shotBee(x,y){
	   	this.x = x;
	    this.y = y;
	    this.stuckX = 0;
	    this.stuck = false;
	    this.indexOfEnemy = -1;
	}


	function enemy(x, y){
	    this.x = x;
	    this.y = y;
	    this.speed = 3;
	    this.health = 3;
	}

	function initParticleSystem(numParticles){
	   	for(var iter=0; iter < numParticles; iter++){
	      	bees.push(new BeeSwarm(Math.random() * 80 - 40, Math.random() * 80 - 40));
	    }
	}

	function removeBees(i){
    		for(k = 0; k < projectileBees.length; k++){
	        	if(projectileBees[k].indexOfEnemy == i){
	           		projectileBees.splice(k, 1);
	           		removeBees(i);
	        	}
      		}
    	}

    function updateBees(i){
    	for(k = 0; k < projectileBees.length; k++){
	      	if(projectileBees[k].indexOfEnemy > i){
	       		projectileBees[k].indexOfEnemy -= 1;
	        }
      	}
    }


    function shootBee(){
	    if(bees.length > 0){
		    bees.splice(0,1);
		    projectileBees.push(new shotBee(hiveCenterX, hiveCenterY));
	    }
	}


	function stage4Update(){
	    	enemycd -= 1;
	      	if(enemycd == 0){ 	
	        	enemies.push(new enemy(400, Math.random() * (canvas.height - 20)));
	        enemycd = enemymaxcd;
	      	}
	    	hiveCenterX = 0;
	      	hiveCenterY = 0;
	      	if(mouseXPos < 40 && mouseYPos < 40){
	      		if(mouseXPos > 0 && mouseYPos > 0){
	        		if(bees.length < 25){
	        			bees.push(new BeeSwarm(Math.random() * 80 - 40, Math.random() * 80 - 40));      
	        		}
	        	}
	      	}
	      	for(i = 0; i < bees.length; i++){
		      	var movePosX = mouseXPos + bees[i].offsetX;
		        var movePosY = mouseYPos + bees[i].offsetY;
		        hiveCenterX += bees[i].x;
	    		hiveCenterY += bees[i].y;
	        	if(bees[i].x == movePosX && bees[i].y == movePosY){
	        		bees[i].offsetX *= -1;
	          		bees[i].offsetY *= -1;
	          		movePosX = mouseXPos + bees[i].offsetX;
	        		movePosY = mouseYPos + bees[i].offsetY;
	        	}
	      		if(bees[i].x != movePosX){
	          		if(Math.abs(bees[i].x - movePosX) < bees[i].speed){
	            		bees[i].x = movePosX;
	          		}else if(bees[i].x > movePosX){
	            		bees[i].x -= bees[i].speed;
	          		}else{
	            		bees[i].x += bees[i].speed;
	          		}
	        	}
	        	if(bees[i].y != movePosY){
	          		if(Math.abs(bees[i].y - movePosY) < bees[i].speed){
	            		bees[i].y = movePosY;
	          		}
	          		if(bees[i].y > movePosY){
	            		bees[i].y -= bees[i].speed;
	          		}else{
	            		bees[i].y += bees[i].speed;
	          		}
	        	}
	      	}
	      	hiveCenterX /= bees.length;
	      	hiveCenterY /= bees.length;
	      	for(i = 0; i < projectileBees.length; i++){
	      		if(projectileBees[i].stuck == false){
	        		projectileBees[i].x += 5;
	          	if(projectileBees[i].x > canvas.width){
	            	projectileBees.splice(i, 1);
	          	}
	        	}else{
	        		projectileBees[i].x -= enemies[projectileBees[i].indexOfEnemy].speed;
	          		if(projectileBees[i].x < 0){
	            		projectileBees.splice(i, 1);
	          		}
	        	}
	      	}
	      	for(i = 0; i < enemies.length; i++){
	      		enemies[i].speed = enemies[i].health;
	      		enemies[i].x -= enemies[i].speed;
	        	for(j = 0; j < projectileBees.length; j++){
	        		if(projectileBees[j].x + 10 > enemies[i].x && projectileBees[j].x < enemies[i].x + 20){
	          			if(projectileBees[j].y + 10 > enemies[i].y && projectileBees[j].y < enemies[i].y + 20){
	            			if(projectileBees[j].stuck == false){
	                			projectileBees[j].stuck = true;
	                			projectileBees[j].indexOfEnemy = i;
	                			enemies[i].health -= 1;
	                			//score4++; 
	              			}     
	            		}	
	          		}
	        	}
	        	if(enemies[i].x < 0 || enemies[i].health <= 0){
	          		removeBees(i);
	          		updateBees(i);
	          		if(enemies[i].health <= 0){
	          			score4 += 1;
	          		}
	          		enemies.splice(i, 1);
	        	}
	      	}

	      	swarmBeeSprite.update();
	      	shotBeeSprite.update();
	    }

	    function stage4Draw(){
	    	ctx.fillStyle = "white";
    		ctx.fillRect(0, 0, width, height);
	    	ctx.strokeStyle = "black";
	    	ctx.strokeRect(0, 0, width, height);
	      
	      	ctx.fillStyle = "yellow";
	    	ctx.fillRect(1, 1, 40, 40);
	      	ctx.strokeRect(1, 1, 40,40);

      		for(var iter=0; iter < bees.length; iter++){
   				swarmBeeSprite.draw(bees[iter].x, bees[iter].y);
      		}
      		for(var iter=0; iter < projectileBees.length; iter++){
      			shotBeeSprite.draw(projectileBees[iter].x, projectileBees[iter].y);
      		}
      
      		ctx.fillStyle = "black";
      		for(var iter=0; iter < enemies.length; iter++){
      			ctx.fillRect(enemies[iter].x, enemies[iter].y, 20, 20);
      			ctx.strokeRect(enemies[iter].x, enemies[iter].y, 20, 20);
      		}
	    }


//**************** initialization code ********************************
//**************** initialization code ********************************

	// initialize a system of beeSwarm particles for stage4
	initParticleSystem(25);