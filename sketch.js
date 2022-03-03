
/***********************************************************************************
  Clickable Nanobot Experience
  by Luis Sanchez
  
  Utilizes the p5 Clickable library to create an interactive experience focused on 
  a series of fictional nanobots.

  The page displays an image of the nanobot in the center in an idle animation. Below
  it are a series of 5 interactive buttons that interact with the nanobots in different
  ways.

  1.) Search Mode Description - Describes what the search mode of the nanobot does.
  2.) Operation Mode Description - Describes what the operation mode of the nanobot does.
  3.) Add Nanobot - Adds a nanobot to the background, once 30 nanobots are on screen,
      they are mobilized and move off the screen.
  4.) Remove Nanobot - Removes a nanobot from the background
  5.) Toggle Modes - This button will toggle between the search and operation mode of
      the nanobot, which is visually different.

***********************************************************************************/


var bImg, gImg, vImg, zImg;
var barbara = new Player("Barbara", "assets/filler.jpg");
var gabriel = new Player("Gabriel", "assets/filler.jpg");
var viktor = new Player("Viktor", "assets/ViktorThumbnail.png");
var zeta = new Player("Zeta", "assets/ZetaThumbnail.png");
var imgArray = [vImg, bImg, gImg, zImg];
var avgHealth, avgSatisfaction;
var stage = 0;
var titleSize, titleY;
var titleFont, otherFont;
var playerManager;
/**
 * Loads the Clickable objects from the given CSV and the Nanobot image from the assets
 * folder.
 */
function preload() {
  playerManager = new ClickableManager('assets/playerClickables.csv');
  bImg = loadImage(barbara.getThumbnail);
  gImg = loadImage(gabriel.getThumbnail)
  vImg = loadImage(viktor.getThumbnail);
  zImg = loadImage(zeta.getThumbnail);
  titleFont = loadFont('assets/Ailerons-Regular.otf');
  otherFont = loadFont('assets/Orbitron Light.otf');
}

/**
 * Calls the setup function for the ClickableManager object and initializes all the
 * relevant global variables for interaction.
 */
var zetaX;
var barbaraX;
var gabrielX;
var viktorX;

var playerClickables = [];

function setup() {
  frameRate(60);
  createCanvas(1200,680);
  zetaX = width/2;
  barbaraX = width/2;
  gabrielX = width/2;
  viktorX = width/2;
  titleSize = 100;
  titleY = height/2;
  avgHealth = calcAvgHealth();
  avgSatisfaction = calcAvgSatisfaction();
 
  playerClickables = playerManager.setup();
  setUpPlayerClickables();
}

function setUpPlayerClickables() {
  // These are the CALLBACK functions. Right now, we do the SAME function for all of the clickables
  for( let i = 0; i < playerClickables.length; i++ ) {
    playerClickables[i].onHover = clickableButtonHover;
    // playerClickables[i].onOutside = clickableButtonOnOutside;
  }
}

clickableButtonHover = function() {
  loadFont(otherFont);
  textSize(30);
  text('hello world!', width/2, height-80);
}

function calcAvgHealth() {
  return (barbara.getHealthValue + 
          gabriel.getHealthValue) / 2;
}

function calcAvgSatisfaction() {
  return (barbara.getSatisfactionValue + 
          gabriel.getSatisfactionValue) / 2;
}
var titleSet = false;
var bounceTitle = false;
var titleSpeed = 0.2;
function drawPlayerState() {
  textAlign(CENTER);
  textFont(titleFont);
  fill('white');
  stroke(0);
  strokeWeight(3);
  textSize(titleSize);
  text('Meet the Players', width/2, titleY);
  if(!titleSet && titleY > (height/2 - 200)) {
    titleY -= 3;
    titleSize -= 0.3;
  } 
  else {
    titleSet = true;
    if(bounceTitle) {
      image(bImg, barbaraX, height/2);
      image(gImg, gabrielX, height/2);
      image(zImg, zetaX, height/2);
      image(vImg, viktorX, height/2);
      titleY += titleSpeed;
      if(titleY >= (height/2 - 190)) {
        titleSpeed = -0.2; 
      }
      else if(titleY <= (height/2 - 210)) {
        titleSpeed = 0.2; 
      }
    }
    else {
      playerIntroConfiguration();
    }
  }
}

function playerIntroConfiguration() {
  
  let startY = height/2;

  image(bImg, barbaraX, startY);
  image(gImg, gabrielX, startY);
  image(zImg, zetaX, startY);
  image(vImg, viktorX, startY);

  if(viktorX > (width/2 - 260)) {
    viktorX -= 10;
  }
    
  if(barbaraX > (width/2 - 80)) {
    barbaraX -= 5;
  }
    
  if(gabrielX < (width/2 + 100)) {
    gabrielX += 5;
  }
    
  if(zetaX < (width/2 + 280)) {
    zetaX += 10;
  }
  
  if(zetaX === (width/2 + 280)) {
    bounceTitle = true;
  }
}

/**
 * Draws the nanobot swarm (if the arrays have elements), the descriptions (if they have
 * been toggled on by the buttons), the central nanobot image (always), and the array of
 * Clickable object buttons.
 */
function draw() {
  background('#0A2463');  
  imageMode(CENTER);
  drawPlayerState();
}





