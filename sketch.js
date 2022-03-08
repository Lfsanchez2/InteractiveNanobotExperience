
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


var nanoSearch, nanoOperation;
var mImg, gImg, vImg, zImg;
var maliaX, gabrielX, viktorX, zetaX;
var malia = new Player("Malia", "assets/MaliaThumbnail.png");
var gabriel = new Player("Gabriel", "assets/filler.jpg");
var viktor = new Player("Viktor", "assets/ViktorThumbnail.png");
var zeta = new Player("Zeta", "assets/ZetaThumbnail.png");
var avgHealth, avgSatisfaction;
var scene = -1;
var titleFont, titleSize, titleY, otherFont;
var titleSet = false;
var bounceTitle = false;
var titleSpeed = 0.2;
var fileArray = [
  "assets/scene1"
]
var nanobots2 = [];
var nanobots = [];
var sceneManager;
var introButtons = []
var techTitleY;
/**
 * Loads the Clickable objects from the given CSV and the Nanobot image from the assets
 * folder.
 */
function preload() {
  sceneManager = new ComplexStateManager(fileArray);
  mImg = loadImage(malia.getThumbnail);
  gImg = loadImage(gabriel.getThumbnail)
  vImg = loadImage(viktor.getThumbnail);
  zImg = loadImage(zeta.getThumbnail);
  nanoSearch = loadImage('assets/SearchMode.png');
  nanoOperation = loadImage('assets/OperationMode.png');
  titleFont = loadFont('assets/Ailerons-Regular.otf');
  otherFont = loadFont('assets/Orbitron Light.otf');
}

/**
 * Calls the setup function for the ClickableManager object and initializes all the
 * relevant global variables for interaction.
 */

function setup() {
  frameRate(60);
  createCanvas(1200,680);

  zetaX = width/2;
  maliaX = width/2;
  gabrielX = width/2;
  viktorX = width/2;

  techTitleY = height/2;
  titleSize = 100;
  titleY = height/2;

  avgHealth = calcAvgHealth();
  avgSatisfaction = calcAvgSatisfaction();

  sceneManager.buildAllStates();
  setupIntroButtons();
  setUpNanobots();
}

function setupIntroClickables() {
  for( let i = 0; i < introButtons.length; i++ ) {
    introButtons[i].onPress = clickablePressed;
    introButtons[i].onHover = clickableHover;
    introButtons[i].onOutside = clickableOutside;
  }
}

clickablePressed = function() {
  if(this.id === 0 || this.id === 2 || this.id === 3) {
    scene += 1;
  }
  else {
    scene -= 1;
  }
}

clickableHover = function(){
  this.width = 350;
  this.textSize = 25;
  if(this.id === 3 || this.id === 2) {
    this.x = width - 420;
  }
  else if (this.id === 0) {
    this.x = width/2 - 175;
  }
}

clickableOutside = function() {
  this.width = 280;
  this.textSize = 14;
  if (this.id === 3 || this.id === 2) {
    this.x = width - 350;
  }
  else if (this.id === 0) {
    this.x = width/2 - 140;
  }
}

function setupIntroButtons() {
  let homeStartButton = new Clickable();
  homeStartButton.id = 0;
  homeStartButton.textFont = otherFont;
  homeStartButton.width = 280;
  homeStartButton.height = 100;
  homeStartButton.text = "Start Introduction";
  homeStartButton.y = height - 130;
  homeStartButton.x = width/2 - 140;
  homeStartButton.textSize = 14;
  

  let backButton = new Clickable();
  backButton.id = 1;
  backButton.textFont = otherFont;
  backButton.width = 280;
  backButton.height = 100;
  backButton.text = "Back";
  backButton.y = height - 130;
  backButton.x = 70;
  backButton.textSize = 14;

  let techIntroNextButton = new Clickable();
  techIntroNextButton.id = 2;
  techIntroNextButton.textFont = otherFont;
  techIntroNextButton.width = 280;
  techIntroNextButton.height = 100;
  techIntroNextButton.text = "Meet the Players";
  techIntroNextButton.y = height - 130;
  techIntroNextButton.x = width - 350;
  techIntroNextButton.textSize = 14;
  

  let playerIntroNextButton = new Clickable();
  playerIntroNextButton.id = 3
  playerIntroNextButton.textFont = otherFont;
  playerIntroNextButton.width = 280;
  playerIntroNextButton.height = 100;
  playerIntroNextButton.text = "Begin Simulation";
  playerIntroNextButton.y = height - 130;
  playerIntroNextButton.x = width - 350;
  playerIntroNextButton.textSize = 14;

  introButtons.push(homeStartButton, backButton, techIntroNextButton, playerIntroNextButton);
}



function calcAvgHealth() {
  return (malia.getHealthValue + 
          gabriel.getHealthValue) / 2;
}

function calcAvgSatisfaction() {
  return (malia.getSatisfactionValue + 
          gabriel.getSatisfactionValue) / 2;
}

function togglePlayerDesc() {
  textFont(otherFont);
  textSize(18);
  rectMode(CENTER);
  textAlign(LEFT, CENTER);
  noStroke();
  var yCheck = mouseY >= (height/2 - 155) && mouseY <= (height/2 - 5);
  if(mouseX >= viktorX - 75 && mouseX <= viktorX + 75 && yCheck) {
    fill(1, 22, 56, 220);
    stroke(255, 255, 255, 180);
    rect(width/2, height/2 + 150, 520, 360, 30);
    fill(27, 153, 138, 180);
    stroke('white');
    rect(width/2, height/2 + 150, 480, 320, 30);
    
    
    fill('white')
    noStroke();
    text('Viktor Harding is the CEO of a world famous biotech company. Depending on your choices,' +
    ' he may be interested in investing into nanobot research and development.', 
    width/2, height/2 + 150, 400, 300);
  }

  // Malia Kealoha = Barbara 
}

/**
 * Draws the nanobot swarm (if the arrays have elements), the descriptions (if they have
 * been toggled on by the buttons), the central nanobot image (always), and the array of
 * Clickable object buttons.
 */
function draw() {
  background('#0A2463');  
  imageMode(CENTER);
  drawScene();
  
}

function drawPlayerIntroScreen() {
  textAlign(CENTER);
  textFont(titleFont);
  fill('white');
  stroke(0);
  strokeWeight(3);
  textSize(titleSize);
  text('Meet the Players', width/2, titleY);
  if(!titleSet && titleY > (height/2 - 260)) {
    titleY -= 4;
    titleSize -= 0.3;
  } 
  else {
    titleSet = true;
    if(bounceTitle) {
      let startY = height/2 - 80;
      image(mImg, maliaX, startY, 160, 160);
      image(gImg, gabrielX, startY, 160, 160);
      image(zImg, zetaX, startY, 160, 160);
      image(vImg, viktorX, startY, 160, 160);
      togglePlayerDesc();
      titleY += titleSpeed;
      if(titleY >= (height/2 - 250)) {
        titleSpeed = -0.2; 
      }
      else if(titleY <= (height/2 - 270)) {
        titleSpeed = 0.2; 
      }
    }
    else {
      playerThumbnailAnimation();
    }
  }
}

function playerThumbnailAnimation() {
  let startY = height/2 - 80;

  image(mImg, maliaX, startY, 160, 160);
  image(gImg, gabrielX, startY, 160, 160);
  image(zImg, zetaX, startY, 160, 160);
  image(vImg, viktorX, startY, 160, 160);

  if(viktorX > (width/2 - 385)) {
    viktorX -= 11;
  }
    
  if(maliaX > (width/2 - 130)) {
    maliaX -= 5;
  }
    
  if(gabrielX < (width/2 + 130)) {
    gabrielX += 5;
  }
    
  if(zetaX < (width/2 + 385)) {
    zetaX += 11;
  }
  
  if(zetaX === (width/2 + 385)) {
    bounceTitle = true;
  }
}

let randomIndex = -1;
function drawSceneElements() {
  let sceneElements = sceneManager.getScene(scene);
  if(sceneElements != null) {
    if (randomIndex === -1) {
      randomIndex = Math.floor(random(0, sceneElements.sceneClickableArray.length));
      if (randomIndex > 0 && randomIndex % 2 != 0) {
        randomIndex -= 1;
      }
      console.log(randomIndex);
    }
    
    rectMode(CENTER);

    noStroke();
    textSize(42);
    fill('white');
    textFont(titleFont);
    textAlign(CENTER, CENTER);
    text('Scenario ' + (scene + 1) + ': ' + sceneElements.sceneTitles[randomIndex/2],
          width/2, 72, 800, 100);

    fill(0)
    rect(450, height/2, 600, 300, 30);

    textSize(20);
    fill('white')
    textFont(otherFont);
    textAlign(LEFT, CENTER);
    text(sceneElements.sceneDescriptions[randomIndex/2], 450, height/2, 500, 450);
    drawCurrentSceneClickables(randomIndex);
  }
}

sceneClickablePressed = function () {
  scene += 1;
  randomIndex = -1;
}

sceneClickableHover = function () {
  this.width = 350;
  this.textSize = 25;
  if (this.id % 2 != 0) {
    this.x = width - 500;
  }
}

sceneClickableOutside = function () {
  this.width = 280;
  this.textSize = 14;
  if (this.id % 2 != 0) {
    this.x = width - 430;
  }
}

function drawCurrentSceneClickables(clickableIndex) {
  let currSceneClickables = sceneManager.getClickables(clickableIndex, scene);
  if(currSceneClickables != undefined) {
    for(let i = 0; i < currSceneClickables.length; i++) {
      currSceneClickables[i].textFont = otherFont;
      currSceneClickables[i].textSize = 14;
      currSceneClickables[i].textScaled = true;
      currSceneClickables[i].draw();
      currSceneClickables[i].onPress = sceneClickablePressed;
      currSceneClickables[i].onHover = sceneClickableHover;
      currSceneClickables[i].onOutside = sceneClickableOutside;
    }
  }
}

var nanobotPyramid = [];
function setUpNanobots() {
  let originX = width/2;
  let originY = -150;
  nanobots.push({x: originX, y: 100, width: 100});
  let limit = 0;
  for(let i = 1; i < 17; i++) {
    let nanobotLayer = [];
    let offset;
    if((i+1) % 2 == 0) {
      offset = 75/2;
      limit++;
    } 
    else {
      offset = 75;
      nanobotLayer.push({x: originX, y: originY});
    }
    for(let j = 0; j < limit; j++) {
      nanobotLayer.push({x: originX - offset, y: originY});
      nanobotLayer.push({x: originX + offset, y: originY});
      offset += 75;
    }
    nanobotPyramid.push(nanobotLayer); 
    originY -= 50;
  }
}

var pyramidFinished = false;
var titleAlpha = 0;
var firstFinished = false;
var mainNanobotStartY = -100;
var mainNanobotWidth = 100;
function techIntroduction() {
  if(firstFinished) {
    image(nanoSearch, width/2, mainNanobotStartY, mainNanobotWidth, mainNanobotWidth);
    textAlign(CENTER, CENTER);
    textFont(titleFont);
    textSize(40);
    noStroke();
    fill(255, 255, 255, titleAlpha);
    text("Nano-Med: Nanotechnology for Medical Aid", width/2, techTitleY);
    if(titleAlpha < 255) {
      titleAlpha += 5;
    }
    if(techTitleY > 70) {
      techTitleY -= 3.8;
    }
    if(mainNanobotStartY < height/2) {
      mainNanobotStartY += 10;
      mainNanobotWidth += 2.8;
    }
    else {
      pyramidFinished = true;
    }
    
  }

  for(let i = 0; i < nanobotPyramid.length; i++) {
    let nanoLayer = nanobotPyramid[i];
    for(let j = 0; j < nanoLayer.length; j++) {
      image(nanoSearch, nanoLayer[j].x, nanoLayer[j].y, 100, 100);
      if(nanoLayer[j].y < height + 100) {
        nanoLayer[j].y = nanoLayer[j].y + 9;
      }
      else {
        nanoLayer.splice(j, 1);
        firstFinished = true;
      }
    }
    if(nanoLayer.length === 0) {
      nanobotPyramid.splice(i, 1);
    }
  }
}

function drawScene() {
  if (scene === -3) {
    rectMode(CORNER);
    textAlign(CENTER, CENTER);
    introButtons[0].draw();
    setupIntroClickables();
  }
  else if (scene === -2) {
    techIntroduction();
    if(pyramidFinished) {
      setupIntroClickables();
      rectMode(CORNER);
      textAlign(CENTER, CENTER);
      introButtons[1].draw();
      introButtons[2].draw();
    }
  }
  else if (scene === -1) {
    rectMode(CORNER);
    textAlign(CENTER, CENTER);
    introButtons[1].draw();
    introButtons[3].draw();
    setupIntroClickables();
    drawPlayerIntroScreen();
  }  
  else if (scene === 0) {
    drawSceneElements();
  }

  else {
    text("Still working...", width/2, height/2);
  }
}





