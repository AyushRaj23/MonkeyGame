//Declaration of Global Variables
var monkey,monkey_run,monkey_stop;
var banana ,banana_img;
var obstacle,obstacle_img;
//Group variables
var foodGroup,obsGroup,orangeGroup;
//Score & losing system
var survivalTime,score,chances;
var gameOver,gameOver_img;
var restart,restart_img;
//Game States
var START=1;
var PLAY=2;
var END=0;
var gameState=START;


function preload()
{
  //To load monkey animation
  monkey_run =   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  

  //To load banana and obstacle
  banana_img = loadImage("banana.png");
  obstacle_img = loadImage("obstacle.png");
  gameOver_img=loadImage("sprite_1.png");
  restart_img=loadImage("sprite_2.png");

  //To load sounds  

}
//600,400


function setup() {
  //To create a canvas
  createCanvas(windowWidth,windowHeight);
  
  //To create monkey sprite
  monkey=createSprite(60,height-75,10,10);  
  monkey.addAnimation("run",monkey_run);
  //Scaling to adjust the animation
  monkey.scale=0.110;
  //monkey.debug=true;
  //To make monkey look like it is on the ground not outside it
  monkey.setCollider("rectangle",0,0,550,340);
  
  //To create ground sprite
  ground=createSprite(width/2,height-42,1200,8);

  
  //To declare new Groups
  foodGroup=new Group();
  obsGroup=new Group();
  
  
  //Initial value of survival Time
  survivalTime=10;
  //Initial value of score
  score=0;
  //Initial value of chances
  chances=3;
  
  //To create gameOver sprite
  gameOver=createSprite(width/2,height-250,10,10)
  gameOver.addImage(gameOver_img);
  gameOver.scale=1.5;
  
  //To create restart 
  restart=createSprite(width-295,height-150,10,10);
  restart.addImage(restart_img);
  restart.scale=0.3;
}


function draw()
{
  //To assign the background
  background("blue");
  
  if(gameState===START)
  {
   //To make restart & game Over invisible
   gameOver.visible=false;
   restart.visible=false;
    
   //Instructions for playing this game/USER GUIDE
   fill("red");
   textSize(18);
   text("1.Press Space Key to Start the Game",50,110);
    text("2.click on monkey to restart",50,140);

   //To make monkey & ground invisible during start state
   monkey.visible=false;
   ground.visible=false;

   //Condition for entering in PLAY state
   if(keyDown("space"))
   {
     gameState=PLAY;
   }
   
  }
  else if(gameState===PLAY)
  {
    //To make monkey & ground visible during PLAY state
    monkey.visible=false;
    ground.visible=false;
    ground.visible=true;
    monkey.visible=true;
    
    //To increase the ground speed with increasement in score
    ground.velocityX=-(4+score/10);
    
    
    //To make the monkey jump to surmount obstacles
    if(keyDown("space")&&monkey.y>320)
    { 
      //To assign upward velocity to monkey
      monkey.velocityY=-11;
      
    }
    
    //To make monkey long jump to collect oranges
    else if(keyDown("UP_ARROW")&&monkey.y>320)
    {
      //To make monkey move up
      monkey.velocityY=-16.5;
      //Monkey get hungry and survival time decrease with long jump
      survivalTime=survivalTime-1;
      //To play long jump sound
 
    } 
    
    //To add gravity 
    monkey.velocityY=monkey.velocityY+0.5;
    
    //To increase the score when monkey touches banana
    if(monkey.isTouching(foodGroup))
    {
      foodGroup.destroyEach();
      score=score+2;
      survivalTime=survivalTime+5;
    }

    
    //To decrease survival time with frame rate
    if(frameCount%100===0)
    {
      survivalTime=survivalTime-1;
    }
    
    //To detect and decrease the chanes when monkey touches any       obstacles
    if(monkey.isTouching(obsGroup))
    {
      chances=chances-1;
      obsGroup.destroyEach();
    }
    
    
    //To call other functions in draw function for execution
    obstacles();
    food();
  }
  else if(gameState===END)
  {
    //To make restart & game Over invisible
    gameOver.visible=true;
    restart.visible=true;
    
    //Destroying objects and setting up their velocity 0 when the     game ends
    ground.velocityX=0
    foodGroup.setVelocityEach(0);
    foodGroup.destroyEach();
    obsGroup.setVelocityEach(0);
    obsGroup.destroyEach();
  }
  
  if(ground.x<0)
  {
    //To give infinite scrolling effect to ground
    ground.x=ground.width/2;
  }

  //To make monkey collide with the ground
  monkey.collide(ground);
  
  //End state condition
  if(chances===0||survivalTime===0)
  {
    gameState=END;
  }
  
  //To restart the game when clicked on restart button
  if(mousePressedOver(restart))
  {
    //Calling restart function
    reset();
  }

  
  //To draw the sprites
  drawSprites();
  
  //Displaying scoring & losing system
  fill("black");
  textSize(18);
  text("Score Board: "+score,20,35);
  text("Survival Time: "+survivalTime,450,35);
  text("Chances: "+chances,250,35);
  
  
}


function obstacles()
{
  //To make obstacles appear at interval of 130 frames
  if(frameCount%170===0)
  {
  //To create obstacle sprite
  obstacle=createSprite(width,height-70,10,10);
  //To add image to banana
  obstacle.addImage(obstacle_img);
  //Scaling to adjust banana
  obstacle.scale=0.15;
  //To assign velocity to banana
  obstacle.velocityX=-(4+score/15);
  //To assign lifetime to banana to avoid memory leaks
  obstacle.lifetime=width/obstacle.velocity;
  //Adding obstacles to obsgroup
  obsGroup.add(obstacle);
  }
}

function food()
{
  //To make banana appear at interval of 150 frames
  if(frameCount%150===0)
  {
    //To create banana sprite
    banana=createSprite(600,Math.round(random(120,270)),10,10);
    //To add image to banana
    banana.addImage(banana_img);
    //To assign velocity to banana
    banana.velocityX=-(3.5+score/10);
    //Scaling to adjust image
    banana.scale=0.1;
    //To assign lifetime to banana
    banana.lifetime=width/banana.velocity;
    //Add banana to foodgroup
    foodGroup.add(banana);
  }
  
}

function reset()
{
  //Initial 
  gameState=PLAY;
  score=0;
  chances=3;
  survivalTime=10;
  gameOver.visible=false;
  restart.visible=false;
}




