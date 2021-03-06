
var space;
var animation1, animation2,animation3;
var bullet1i;
var bullet2i;
var hero_img,monster1_img,monster2_img;
var gameState="play";
function preload()
{
space= loadImage("SPACe.png");
bullet1i = loadImage("bullet1.png");
bullet2i= loadImage("bullet2.png");

hero_img = loadImage("hero.png");
monster1_img = loadImage("monster.png");
monster2_img = loadImage("monster.png");

/*animation1 = createImg("fighter.gif");
animation2 = createImg("monster.gif");
animation3 = createImg("monster.gif");*/

}

function setup()
{
  createCanvas(1000, 1400);
 
 
  ground = createSprite(348,500,700,1400);
  ground.addImage("galaxy",space);
  ground.y = ground.width/2;
  ground.velocityY = 3

  bullet1Group = new Group();
  
  bullet2Group = new Group();

  bullet3Group = new Group();

  hero = createSprite(500,1000, 70, 70);
  hero.addImage("jet",hero_img)
  hero.scale=0.7;

  alien1 = createSprite(900, 200, 70, 70);
  alien1.addImage("alien",monster1_img);
  alien1.scale=0.5

  alien2 = createSprite(90, 200, 70, 70);
  alien2.addImage("alien2",monster2_img)
  alien2.scale=0.5;


  hero.debug=true;
  alien1.debug=true;
  alien2.debug=true;
  
  hero.setCollider("rectangle",10,50,380,hero.height);
}

function draw()
{
background("black");
        if (gameState = "play")
      {
        if (ground.y > 700){
          ground.y = ground.height/2;

          if (keyDown (LEFT_ARROW))
          {
            hero.x = hero.x-7;
          
          }
  
  
          if (keyDown (RIGHT_ARROW))
          {
            hero.x = hero.x +7;
          
          }
          if(bullet1Group.isTouching(alien1 ))
          {
          alien1.destroy();
          bullet2Group.destroyEach();
          } 
          if(bullet1Group.isTouching(alien2 ))
          {
          alien2.destroy();
          bullet3Group.destroyEach();
          } 
  
  
          if(bullet2Group.isTouching(hero ))
          {
          hero.destroy();
          bullet1Group.destroyEach();
          } 
          if(bullet3Group.isTouching(hero ))
          {
          hero.destroy();
          bullet1Group.destroyEach();
        }

       

        }

}








 spawnBulletMO()

spawnBulletHE();

 spawnBulletsMOLeft();
drawSprites();
}

function spawnBulletMO()
{
  if(frameCount % 100 === 0) {
    var bullet2 = createSprite(900,200,10,40);
    bullet2.addImage("bullet",bullet2i)
    //obstacle.debug = true;
    bullet2.velocityY = 18;
    bullet2Group.add(bullet2);
    
  }}
  
  
  
  function spawnBulletHE()
{
  if(frameCount % 60 === 0) {
    var bullet1 = createSprite(380,900,10,40);
    bullet1.addImage("bullet",bullet1i)
    //obstacle.debug = true;
    bullet1.velocityY = -35;
    bullet1.scale=0.3;
     bullet1.x=hero.x
     bullet1Group.add(bullet1);

  }}
  

  
  function spawnBulletsMOLeft()
  {
    if(frameCount % 100 === 0) {
      var bullet3 = createSprite(90,200,10,40);
      bullet3.addImage("bullet",bullet2i)
      //obstacle.debug = true;
      bullet3.velocityY = 18;
      bullet3Group.add(bullet3);
    }}
















































/*var PLAY = 1;
var END = 0;
var gameState = PLAY;

var hero , alien1, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background("lightgreen");
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
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
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}*/