class Food {
    constructor(){

        this.foodStock = 14;
        this.lastFed = 0;
        this.x=0;
        this.image2 = loadImage("Images/food.png");
       
    }

    updateFoodStock(food){
        this.foodStock = food;
        database.ref('/').update({
            Food: food
        });
    }
    getFoodStock(){
        this.x = database.ref('Food');
        this.x.on("value",(data)=>{
            this.foodStock=data.val();
          })
    }
    deductFood(){
        this.foodStock--;
        updateFoodStock(this.foodStock);
    }

    display(){

     var x = 20, y = 40;
     imageMode(CENTER);
     if(this.foodStock != 0){
         for(var i = 0; i < this.foodStock; i++){
             if(i % 7 == 0){
                x = 50;
                y = y + 90;
             }
             image(this.image2, x, y, 100, 70.5);
             x = x + 95; 
         }
      }
    }
}