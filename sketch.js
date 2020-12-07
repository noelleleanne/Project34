//Create variables here
var dog, dogImg, happyDogImg, database, foodS, foodStock;
function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("happydogImg.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(20);

  dog = createSprite(250,300,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.3;
}


function draw() {  
  background(rgb(255,179,102));
  if(foodS!== undefined){
    textSize(15);    
    fill(255);    
    text("Note: Press UP ARROW to feed DRAGO milk", 90,20);
    textSize(30);
    text("Food Remaining: "+foodS, 110,150);

    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDogImg);
    }

    if(keyWentUp(UP_ARROW)){
      dog.addImage(dogImg);
    }
  

    if(foodS === 0){
      foodS = 20;
    }


    drawSprites();
  }
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  });
}

function readStock(data){
  foodS = data.val();
}

