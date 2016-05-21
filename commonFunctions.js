//**************** variable declarations ********************************
//**************** variable declarations ********************************
	var canvas = document.getElementById('mygame');
	var ctx = canvas.getContext('2d');
	
	var width = canvas.width;
	var height = canvas.height;

	//
	var playerImage = new Image();
	playerImage.src = "http://i.imgur.com/CWlCOaK.png";

		
	// initialize player avatar
	var player = new Bee(200,200,42,43,4);

		

	// initialize new sprite for stages 1-3
	topDownBee = new SpriteSheet("http://i.imgur.com/jAKX2UY.png", 43, 42, 10, 2);



	//Player object
	function Bee(x, y, width, height, speed){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.holding = false;
	}

	// player movement
	    var mouseXPos = 200;
		var mouseYPos = 200;
		canvas.addEventListener("mousemove", movePos);
		function movePos(e){
    		mouseXPos = e.clientX - player.width/2;
    		mouseYPos = e.clientY - player.width/2;
		}

		// returns a random integer between min and max (inclusive)
		function getRandomIntInclusive(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		// checks for player-particle collisions
      	function checkPlayerParticleCollision(player,particle){
        	if( 
	            ( 
	            	( (player.x+player.width >= particle.x) && (player.x <= particle.x+particle.width) )
	            	||( (player.x <= particle.x) && (player.x+player.width > particle.x) )
	            )
	            &&
	            (
	            	( (player.y+player.height >= particle.y) && (player.y <= particle.y) )
	            	||( (player.y <= particle.y+particle.height) && (player.y+player.height >= particle.y) )
	            )
	        )
	            {return true;}
	    }
		function SpriteSheet(url, frameWidth, frameHeight, frameSpeed, endFrame){
			var image = new Image();
			var numFrames;
			  
			var currentFrame = 0;
			var counter = 0;
			image.src = url;
			  
			image.onload = function(){
				numFrames = Math.floor(image.width / frameWidth);
			}
			  
			this.update = function(){
				if(counter == (frameSpeed - 1)){
			    	currentFrame = (currentFrame + 1) % endFrame;
			    }
			    
			    counter = (counter + 1) % frameSpeed;
			}
			  
			this.draw = function(x, y){
				var row = Math.floor(currentFrame / numFrames);
				var col = Math.floor(currentFrame % numFrames);
			    
				ctx.drawImage(image, col*frameWidth, row*frameHeight, frameWidth, frameHeight, x, y, frameWidth, frameHeight);
			  } 
		}


		function Bar() {
		  this.x = canvas.width / 2;
		  this.y = 430;
		  this.width = 200;
		  this.color = "black";
		  this.height = 20;

		  this.draw = function(width) {
			ctx.fillStyle = 'red';
			ctx.fillRect(this.x, this.y, width, this.height);
			//ctx.strokeStyle = this.color.
			ctx.rect(this.x,this.y-1,this.width,this.height+1);
			ctx.stroke();
		  }
		}