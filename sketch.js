var dog, happyDog,dogImg;
var foodS, foodstock;
var database;
var feedPet, addFood;
var fedTime,lastFed;
var foodObj;

function preload()
{
	dogImg = loadImage("images/Dog.png")
  happyDog = loadImage("images/HappyDog.png")
}

function setup() {
	createCanvas(1000, 400);

  database = firebase.database()

  dog = createSprite(200,200,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.15

  foodstock = database.ref('Food')
  foodstock.on("value",readstock);

  foodObj = new Food();

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedPet);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);
}


function draw() {  

  background(46,139,87);

  foodObj.display();

  
  

  drawSprites();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){

    lastFed=data.val();

  });

  

  text("foodStock"+foodstock,150,150);
  textSize(15);
  fill(0);

  if(lastFed>=12){
    text("Last Feed :"+lastFed%12+ "PM",350,30);
  }
  else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }
  else{
    text("LastFeed :"+ lastFed+"AM",350,30);
  }

}

function readstock(data){

foodS = data.val();

}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
  x=x-1;
  }
  database.ref('/').update({
    Food : x
  })
}

function feedPet(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}