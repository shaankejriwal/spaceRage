var PLAY = 1;
var END = 0;
var gameState = PLAY;
var spaceship,spaceCraftImg,backgroundImg,background10;
var score = 0;
var lives = 3;
var spacesound,bulletsound,crashsound;

function preload(){
 backgroundImg = loadImage("images/background2.png");
 bulletImg = loadImage("images/bullet1.png");
 spaceCraftImg = loadImage("images/spacecraft.png");
 asteroid1Img = loadImage("images/asteroid1.png");
 asteroid2Img = loadImage("images/asteroid2.png");
 asteroid3Img = loadImage("images/asteroid3.png");
 gameOverImg = loadImage("images/gameOver.png");
 restartImg = loadImage("images/restart.png");
 crashImg = loadImage("images/crash.png");

 spacesound = loadSound("sounds/space.mp3");
 //bulletsound = loadSound("sounds/bullet.mp3");
 crashsound = loadSound("sounds/die.mp3");
}

function setup(){
 createCanvas(windowWidth,windowHeight);

 restart = createSprite(width/2,height/2);
 restart.addImage("i",restartImg);

 gameOver = createSprite(width/2,height/2-200);
 gameOver.addImage("i",gameOverImg);
 
 background10 = createSprite(width,height);
 background10.addImage("images/background2.png",backgroundImg);
 spacesound.play();

 background10.scale = 10;

 background10.velocityY = 5;

 spaceship = createSprite(100,height/2,30,30);
 spaceship.addImage("images/spacecraft.png",spaceCraftImg);
 spaceship.scale = 0.3;

 bulletGroup = new Group();
 asteroidGroup = new Group();

 edges = createEdgeSprites();
}

function draw(){
 background(0);

 if((gameState === PLAY)){

 if(background10.y>height){
	background10.y = height/2;
}

restart.visible = false;
gameOver.visible = false;

 if(keyDown("UP_ARROW")){
	 spaceship.y -= 10;
 }

 if(keyDown("DOWN_ARROW")){
	 spaceship.y += 10;
 }

 if(keyDown("LEFT_ARROW")){
	 spaceship.x -= 10;
 }

 if(keyDown("RIGHT_ARROW")){
	 spaceship.x += 10;
 }

 spaceship.bounceOff(edges);

 if(keyDown("space")){
	createBullets();
 }

 spawnAsteroids();
 
 


	for (var i = 0; i < asteroidGroup.length; i++) {
		if (asteroidGroup.get(i).isTouching(bulletGroup)) {
			asteroidGroup.get(i).destroy();
			bulletGroup.destroyEach();
			score+=1;
		}
 }

 if(asteroidGroup.isTouching(spaceship)){
	 asteroidGroup.destroyEach();
	 crashsound.play();
	 lives = lives-1;

	if(lives === 0){
		gameState = END;
	} 
 }
 
}
	drawSprites();

	fill("lightblue");
	textSize(16);
	text("lives:)"+lives,width-200,50);

	text("score:)"+score,width-100,50)

	 if(gameState === END){
		asteroidGroup.destroyEach();
		restart.visible = true;
		gameOver.visible = true;

		crash = createSprite(spaceship.x,spaceship.y);
		crash.addImage("c",crashImg);
		crash.scale = 0.5;
		
		if(mousePressedOver(restart)){
			gameState = PLAY;
			lives = 3;
			score = 0;
			spaceship.x = width/2-400;
			spaceship.y = height/2;
		}
	}
	


}

function spawnAsteroids(){
	if(frameCount%20 === 0){
		asteroid = createSprite(width-80,height/2,30,30);
		asteroid.scale = 0.2;
		asteroid.velocityX = -8-3*score/100;
		asteroid.y = Math.round(random(30,height-30));
		var rand = Math.round(random(1,4))
		switch(rand){
			case 1: asteroid.addImage("images/asteroid1.png",asteroid1Img);
			break;
			case 2: asteroid.addImage("images/asteroid2.png",asteroid2Img);
			break;
			case 3: asteroid.addImage("as3",asteroid3Img);
			break;
			default: 
			break;
		}

		asteroidGroup.add(asteroid);
		asteroid.lifetime = width/8;

	}
}

function createBullets(){
	if(frameCount%10 === 0){
	var bullet = createSprite(spaceship.x,spaceship.y,5,5);
	bullet.addImage("b",bulletImg);
	//bulletsound.play();
	bullet.scale = 0.2;
	bullet.velocityX = 5;
	bulletGroup.add(bullet);
	bullet.lifetime = width/5;	
	}
}
