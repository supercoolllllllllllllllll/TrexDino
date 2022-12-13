
var invsGround;


var ground,groundImg;
var cloud,cloudImg,cloudGroup;
var trex ,trex_running, trex_collided;
var obstacleGroup,obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var gameOver, GameOver
var restart, button
var gameState = "PLAY";
var dieSound,checkpointSound,jumpSound
var highscore;

var score;


function preload(){

 



  groundImg = loadImage("ground2.png");
  cloudImg = loadImage("cloud.png");
  trex_running = loadAnimation ("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");


  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  dieSound = loadSound("die.mp3");
  checkpointSound = loadSound("checkpoint.mp3");
  jumpSound = loadSound("jump.mp3");


 GameOver = loadImage("gameOver.png");
restart = loadImage("restart.png");


}
function setup(){
  createCanvas(windowWidth, windowHeight);
  
  //create a trex sprite

score = 0;
highscore = 0;

invsGround = createSprite(width/2,height-40,width,5);
invsGround.visible = false

ground = createSprite(width/2,height-60,windowWidth,20);
ground.addImage (groundImg);
ground.x = ground.width/2;

var number = Math.round(random(1,10))
console.log(number)

trex = createSprite (50,height-70,10,10);
 trex.addAnimation ("running",trex_running);
trex.addAnimation("collided", trex_collided);
trex.scale = 0.65

gameOver = createSprite(width/2,height-650,20,20);
gameOver.addImage(GameOver);
gameOver.scale = 2.5
gameOver.visible = false;

button = createSprite(width/2,height-450,20,20);
button.addImage(restart);
button.scale = 2.5;
button.visible = false;

 cloudGroup = new Group();
obstacleGroup = new Group();


}

function draw(){
  background("white") 
  drawSprites();
  
  
  
if (gameState === "PLAY"){
  if (keyDown("space") && trex.y >= height-120   ){
    trex.velocityY = -12
    jumpSound.play();
  }
  ground.velocityX = -(7.5+2*score/100);


  if((ground.x)/2 <  0){
    ground.x = ground.width/2              
  }
  
  score = score + Math.round(frameRate()/60);
  spawnClouds();
spawnObstacles();



if(score > highscore){
  highscore = score;
}


if (score % 100 == 0 && score > 0  ){
  checkpointSound.play();
}

if (obstacleGroup.isTouching(trex)){
  gameState = "END";
  dieSound.play();
  trex.velocityY = 0;
  trex.velocityX = 0;
}
}


else if (gameState === "END"){
    ground.velocityX = 0;

  cloudGroup.setVelocityXEach (0);    
  obstacleGroup.setVelocityXEach (0);

  trex.changeAnimation("collided",trex_collided);

  gameOver.visible = true;
  button.visible = true;



  cloudGroup.setLifetimeEach  (-1);
  obstacleGroup.setLifetimeEach (-1);

  
if(mousePressedOver(button)){
  reset();
}







}


      
// adding velocity to ground


 trex.velocityY = trex.velocityY +0.8;

 edges = createEdgeSprites();

 trex.collide(invsGround); 




fill("gray");
textSize (20);
text("score : "+score,width-2000,30);


fill("gray");
text("highscore : " +highscore,width-1800,30)





}


function spawnClouds () {
  if (frameCount % 100  == 0){
 
 
    cloud = createSprite(width-50,height-900,20,10);
    cloud.addImage(cloudImg);                                                                                      
    cloud.velocityX = -3
    cloud.scale = 2
    cloud.y = Math.round(random(50,300));
    cloud.depth = trex.depth;
    trex.depth = trex.depth +1;
    cloudGroup.add(cloud);
    cloud.lifetime = width/3; 
    
  }
}
 



function spawnObstacles(){
  if (frameCount % 60 === 0){
  obstacle = createSprite(width-50,height-70,10,40);
  obstacle.velocityX = -(7.5+2*score/100);


var rand = Math.round(random(1,6));

switch (rand) {
  case 1: obstacle.addImage(obstacle1);
          break;
case 2: obstacle.addImage(obstacle2);
  break;
case 3: obstacle.addImage(obstacle3);
 break;
 case 4: obstacle.addImage(obstacle4);
 break;
 case 5: obstacle.addImage(obstacle5);
  break;
 case 6: obstacle.addImage(obstacle6);
 break;
 default: break;

}
obstacle.scale = 0.67;
obstacle.lifetime = 300;
obstacleGroup.add(obstacle);






  }



}



function reset(){

  gameState = "PLAY";
  trex.changeAnimation("running",trex_running);
  score = 0
  cloudGroup.destroyEach();
  obstacleGroup.destroyEach();
  gameOver.visible = false;
  button.visible = false;

}