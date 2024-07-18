Number.prototype.clamp = function(min, max){
  return this < min?min :(this>max?max:this); 
};

var gameview = function(){


// Canvas Settings, vars

var width = window.innerWidth;
var height = window.innerHeight;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var wheel = document.getElementById("Wheel")

// Con, else

canvas.width = width;
canvas.height = height;
canvas.style.background = "gray"
// Variables

var keys = [];
var playerWidth = 25;
var playerHeight = 25;
var playerJump = false;
var money = 100;
var playerColor = "blue";
var playerMaxSpeed = 5;

//By usign velocity you can check a players position in another frame allowing you to preepmt clipping etc.

var velx = 0;
var vely = 0;
var friction = .9;
var gravity = .5;
var playerJumping = 0
var playerX = width/2;
var playerY = height - 100;
var lvl = 0

// Lava, Lvl Finish, etc



var finish = [
  [width/2+40, 150, 20, 20],
  [width-60, 465, 20, 20]
  ];


var lava = [0, 815, width, 100]

// Functions

function round(vary){
  if (vary < 0.001){
    vary = 0;
  };
};

////////////////////////CORE LOOP///////////////////////////////////////////////////////////
(function update(){

    ctx.clearRect(0,0,width,height);

  //check keys

  //spacebar
  if (keys[32]){
    if (playerJumping > 0 && vely > -5){
      playerJumping -= 1;
      vely = -playerMaxSpeed*3;
      velx *= 1.75;
    }
  }
  //a key
  if (keys[65]){
    if (velx > -playerMaxSpeed){
      velx = velx-1;
    }
  }
  // d key
  if (keys[68]){
    if (velx < playerMaxSpeed){
      velx = velx+1;
    }
  }

  // s key
  if (keys[83] && vely < playerMaxSpeed*4){
    vely += 1.5;
  };

//Physics

  velx *= friction;
  round(velx);

  vely += gravity;
  round(vely);

  playerX += velx;
  playerY += vely;
//Keeps Player in Bounds////////////////////////////
  playerX = playerX.clamp(0, width - playerWidth);
  playerY = playerY.clamp(0, height - playerHeight);
//Ready to Jump/////////////////////////////////////
if(playerY >= height - playerHeight){
  playerJumping = 2
  };

//Lava////////////////////////////////////////

    if(playerY >815 - playerHeight){
    playerX = width/2
    playerY = height - 100
  };

//lvl 1/////////////////////////////////////////////////////////////////////////////////////

  var plats_1 = [
  [150, 400, 100, 20],
  [150, 550, 100, 20],
  [width/2, 800, 100, 20],
  [width/2, 175, 100, 20]
  ];
  if(lvl === 0){
    for(var i=0; i < plats_1.length;i++){
      var plat_1=plats_1[i];
      if (playerY < plat_1[1] + playerHeight){
        if(playerX+playerWidth > plat_1[0] && playerX < plat_1[0]+plat_1[2]&& playerY+vely > plat_1[1] - playerHeight){
          if(vely>0){
            playerY = playerY.clamp(-50, plat_1[1]-playerHeight);
            playerJumping = 2
            vely = 0
          };
        };
      };
    };

  //draw platforms lvl 1
  ctx.fillStyle = "Black"

  for(var i=0; i<plats_1.length;i++){
    ctx.fillRect(plats_1[i][0], plats_1[i][1], plats_1[i][2], plats_1[i][3]) 
  };

    ctx.fillRect(finish[lvl][0], finish[lvl][1], finish[lvl][2], finish[lvl][3])

  };

//lvl 2////////////////////////////////////////////////////////////////////////////////////////
  var plats_2 = [
  [width/2, height-50, 100, 20],
  [width/2-200, 700, 100, 20],
  [width/2-400, 575, 100, 20],
  [width/2-600, 450, 100, 20],
  [width/2-600, 50, 100, 20],
  [width/2, 25, 100, 20],
  [width-100, 415, 100, 20]
  ];

  if(lvl === 1){
    for(var i=0; i < plats_2.length;i++){
      var plat_2=plats_2[i];
      if (playerY < plat_2[1] + playerHeight){
        if(playerX+playerWidth > plat_2[0] && playerX < plat_2[0]+plat_2[2]&& playerY+vely > plat_2[1] - playerHeight){
          if(vely>0){
            playerY = playerY.clamp(-50, plat_2[1]-playerHeight);
            playerJumping = 2
            vely = 0
          };
         };
        };
      };
      ctx.fillStyle = "Black"
  for(var i=0; i<plats_2.length;i++){
    ctx.fillRect(plats_2[i][0], plats_2[i][1], plats_2[i][2], plats_2[i][3]); 
  };
};

//Finish Level Detection



  //draw platforms lvl 2
  

    ctx.fillRect(finish[lvl][0], finish[lvl][1], finish[lvl][2], finish[lvl][3]);
//Drawing

  ctx.fillStyle = "Orange"
  ctx.fillRect(lava[0], lava[1], lava[2], lava[3]);

  ctx.drawImage(wheel, playerX, playerY);

  setTimeout(update,1000/60);
     if(Math.abs(playerX - finish[lvl][0]) < 25 && Math.abs(playerY - finish[lvl][1]) < 25 ){
      lvl+=1;
      playerX = width/2
      playerY = height - 100
    };
}());

//Gameplay 



document.onkeydown = document.onkeyup = function(e) { 
  keys[e.keyCode] = e.type === "keydown";
};

};
setTimeout(gameview, 1000);