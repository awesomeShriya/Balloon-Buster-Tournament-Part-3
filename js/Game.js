class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
      bow1=createSprite(displayWidth-50,50);
      bow1.addImage(bowImg);
      bow1.scale=0.1;
      bow2=createSprite(displayWidth-50,200);
      bow2.addImage(bowImg);
      bow2.scale=0.1;
      bow3=createSprite(displayWidth-50,350);
      bow3.addImage(bowImg);
      bow3.scale=0.1;
      bow4=createSprite(displayWidth-50,500);
      bow4.addImage(bowImg);
      bow4.scale=0.1;
      bow5=createSprite(displayWidth-50,650);
      bow5.addImage(bowImg);
      bow5.scale=0.1;
      bows=[bow1,bow2,bow3,bow4,bow5];
     // cars = [car1, car2, car3, car4];
    }
  
    play(){
      form.hide();
  
      Player.getPlayerInfo();
      image(backgroundImg,0,0,displayWidth-20,displayHeight-30);
      var x=displayWidth-100;
      var y=10;
      var index=0;
      drawSprites();
      for(var plr in allPlayers){
        index=index+1;
        x=1500-allPlayers[plr].distance;
        y=10;
        bows[index-1].x=x;
        bows[index-1].y=y;
        if(index===player.index){
          fill("black");
          textSize(25);
          text(allPlayers[plr].name,x-25,y+25);
        }
        textSize(25);
        fill("white");
        text("Player1:"+allPlayers.player1.score,50,50);
        text("Player2:"+allPlayers.player2.score,50,100);
        text("Player3:"+allPlayers.player3.score,50,150);
        text("Player4:"+allPlayers.player4.score,50,200);
        text("Player5:"+allPlayers.player5.score,50,250);
      }
  
      if(frameCount%20===0){
        balloons=createSprite(0,random(100,1000),10,10);
        balloons.velocityX=5;
        balloons.scale=0.1
        var rand=Math.round(random(1,7));
        switch(rand){
          case 1:balloons.addImage(balloon1Img);
          break;
          case 2:balloons.addImage(balloon2Img);
          break;
          case 3:balloons.addImage(balloon3Img);
          break;
          case 4:balloons.addImage(balloon4Img);
          break;
          case 5:balloons.addImage(balloon5Img);
          break;
          case 6:balloons.addImage(balloon6Img);
          break;
          case 7:balloons.addImage(balloon7Img);
          break;
        }
        balloonGroup.add(balloons);
      }
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance -=10
        player.update();
      }
      if(keyIsDown(DOWN_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
  
      if(player.index !== null){
       for(var i=0; i<balloonGroup.length; i++){
         if(balloonGroup.get(i).isTouching(players)){
           balloonGroup.get(i).destroy();
           player.score=player.score+1;
           player.update();
         }
       }
      }
  
      
    }
    end(){
      console.log("gameEnded");
    }
  }
  