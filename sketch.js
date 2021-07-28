//Create variables here
var database;
var dog,dogImage,dogImage1,food,foodImage,foodStock,foodRef;
var feed;
var fedTime,lastFed,foodRem;
var foodObj;

var value;
var milkimg,milkbottle;
var Dfood, DfoodI;

function preload(){
  dogimage = loadImage("Images/Dog.png");
  dogimage2 = loadImage("Images/happydog.png");
  milkimg = loadImage("Images/R.png");
  DfoodI = loadImage("Images/food.png");
}

function setup() {
  createCanvas(1000, 500);
  foodObj=new Food();
  //foodObj.updateFoodStock(20);

  dog = createSprite(900,300);
  dog.addImage(dogimage);
  dog.scale = 0.3;

  database = firebase.database();
  //food = database.ref('Food');
  //food.on("value",readStock);

  feed = createButton("Feed your dog");
  feed.position(550,150);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(450,150);
  addFood.mousePressed(addFoods);

  DogName = createInput("Your Dog's Name");
  DogName.position(680, 150);

  submit = createButton("Submit");
  submit.position(850, 150);
  submit.mousePressed(()=>{
    if(confirm("Are You Sure?") == true){
    submit.hide();
    }else{
      submit.visible = true;
      DogName.visible = true;
    }
  });

  /*milkbottle = createSprite(700,330);
  milkbottle.addImage(milkimg);
  milkbottle.visible = 0;
  milkbottle.scale = 0.15;*/

  Dfood = createSprite(250,350);//750,350
  Dfood.addImage(DfoodI);
  //Dfood.velocityX = 7;
  Dfood.visible = 0;
  Dfood.scale = 0.07;
}


function draw() {  
  background(rgb(166, 141, 183));
  drawSprites();

  if(Dfood.x >= 750){
    Dfood.velocityX = 0;
  }

   console.log(value)
  foodObj.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  fill("white");
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + " PM", 150,25);
   }else if(lastFed==0){
     text("Last Fed : 12 AM",350,30);
   }else{
     text("Last Fed : "+ lastFed + " AM", 150,25);
   }
   fill(4,23,117)
   textSize(20)
   text(value,400,dog.y-80)
}
function feedDog()
{
  foodObj.getFoodStock();
  if(foodObj.foodStock <= 0)
  {
    foodObj.foodStock = 0;
    Dfood.visible = 0;
    dog.addImage(dogimage);
  }else{
    dog.addImage(dogimage2);
    if(foodObj.foodStock == 1)
    {
        Dfood.visible = 0;
        dog.addImage(dogimage);
    }
    Dfood.x = 250;
    Dfood.velocityX = 20;
    Dfood.visible = 1
    foodObj.updateFoodStock(foodObj.foodStock-1);
    database.ref('/').update({
    Food:foodObj.foodStock,
    FeedTime:hour()
    });
  }
}
function addFoods()
{
  
  foodObj.updateFoodStock(foodObj.foodStock+1);
  database.ref('/').update({
    Food:foodObj.foodStock
  });
}
/*function readStock(data){
  foodStock = data.val();
}*/

/*function keyPressed(){
  if(keyWentDown(UP_ARROW)){
    food = database.ref("Food");
    foodStock = foodStock - 1;
    food.set(foodStock);
    dog.addImage(dogimage2);
  }
  else{
    dog.addImage(dogimage)
  }
} */