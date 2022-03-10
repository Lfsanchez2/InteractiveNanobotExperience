
/***********************************************************************************
  Interactive NanoMed Experience
  by Luis Sanchez
  
  Utilizes the p5 Clickable library to create an interactive experience focused on 
  a series of fictional nanobots created by the NanoMed company.

  You play as the CEO of the company and you pick choices based on the other 4 players
  of the game: Viktor, Malia, Gabriel, and Zeta.

  This project utilizes a custom state manager that reads specifically formatted csv
  files to create a series of scenes described by events and choices. After a choice
  is picked in a secne, you are taken to a results page where you can see what effect
  your decision had on the players.

***********************************************************************************/


var nanoSearch, nanoOperation;
var mImg, gImg, vImg, zImg;
var maliaX, gabrielX, viktorX, zetaX;
var malia = new Player("Malia", "assets/images/MaliaThumbnail.png");
var gabriel = new Player("Gabriel", "assets/images/GabrielThumbnail.png");
var viktor = new Player("Viktor", "assets/images/ViktorThumbnail.png");
var zeta = new Player("Zeta", "assets/images/ZetaThumbnail.png");
var avgHealth, avgSatisfaction;
var scene = -2;
var titleFont, titleSize, titleY, bodyFont;
var titleSet = false;
var bounceTitle = false;
var titleSpeed = 0.2;
var fileArray = [
  "assets/scene1", "assets/scene2", "assets/scene3"
]
var logoImg;
var nanobots2 = [];
var nanobots = [];
var sceneManager;
var introButtons = []
var techTitleY;
var results = -1;
var updated = -1;

var leftX;
var rightX;
var iconTopY;
var iconBottomY;

var color1;
var color2;
var transitionStep;

function preload() {
  // Load all the tables for the scene manager, will be setup further in setup method
  sceneManager = new ComplexSceneManager(fileArray);
  // Load all player profile images
  mImg = loadImage(malia.getThumbnail);
  gImg = loadImage(gabriel.getThumbnail)
  vImg = loadImage(viktor.getThumbnail);
  zImg = loadImage(zeta.getThumbnail);
  // Load logo image for intro scene
  logoImg = loadImage('assets/images/NanoMedLogo.png');
  // Load nanobot search mode image
  nanoSearch = loadImage('assets/images/SearchMode.png');
  // Load nanobot operation mode image
  nanoOperation = loadImage('assets/images/OperationMode.png');
  // Load title font
  titleFont = loadFont('assets/fonts/Ailerons-Regular.otf');
  // Load body font
  bodyFont = loadFont('assets/fonts/Orbitron Light.otf');
}

/**
 * Initialize global variables in setup
 */

function setup() {
  frameRate(60);
  createCanvas(1200,680);
  // Color variables for transitioning background colors in intro scene
  color1 = color(1, 22, 56);
  color2 = color(10, 37, 99);
  transitionStep = 0;
  // Position variables for results page score tracking
  leftX = 115;
  rightX = width - 115;
  iconTopY = (height/2) - 100;
  iconBottomY = (height/2) + 100;
  // X values for the player introduction scene
  zetaX = width/2;
  maliaX = width/2;
  gabrielX = width/2;
  viktorX = width/2;
  // Initializes the scores of each player accordingly
  viktor.setInterest(0);
  viktor.setSatisfaction(50);
  malia.setSatisfaction(70);
  malia.setHealth(80);
  gabriel.setSatisfaction(65);
  gabriel.setHealth(70);
  zeta.setInterest(0);
  zeta.setDanger(0);
  // Y position for intro scene title
  techTitleY = height/2;
  // Size and Y position for player introduction scene
  titleSize = 100;
  titleY = height/2;
  // Builds all the scene information from the tables set in preload
  sceneManager.buildAllStates();
  // Creates and saves Clickable buttons to be used for intro scenes
  setupIntroButtons();
  // Creates the nanobot pyramid for the intro animation
  setUpNanobots();
}

// This function sets up the navigation buttons used for before the csv scenes start 
// Also defines the continue button the advances to the next scene from a results page.
function setupIntroButtons() {
  let homeStartButton = new Clickable();
  homeStartButton.id = 0;
  homeStartButton.textFont = bodyFont;
  homeStartButton.width = 280;
  homeStartButton.height = 100;
  homeStartButton.text = "Start Introduction";
  homeStartButton.y = height - 130;
  homeStartButton.x = width/2 - 140;
  homeStartButton.textSize = 14;
  homeStartButton.color = "#c3cff7";
  homeStartButton.stroke = "#011638";
  homeStartButton.strokeWeight = 5;
  

  let backButton = new Clickable();
  backButton.id = 1;
  backButton.textFont = bodyFont;
  backButton.width = 280;
  backButton.height = 100;
  backButton.text = "Back";
  backButton.y = height - 130;
  backButton.x = 70;
  backButton.textSize = 14;
  backButton.color = "#c3cff7";
  backButton.stroke = "#011638";
  backButton.strokeWeight = 5;

  let techIntroNextButton = new Clickable();
  techIntroNextButton.id = 2;
  techIntroNextButton.textFont = bodyFont;
  techIntroNextButton.width = 280;
  techIntroNextButton.height = 100;
  techIntroNextButton.text = "Meet the Players";
  techIntroNextButton.y = height - 130;
  techIntroNextButton.x = width - 140;
  techIntroNextButton.textSize = 14;
  techIntroNextButton.color = "#c3cff7";
  techIntroNextButton.stroke = "#011638";
  techIntroNextButton.strokeWeight = 5;
  

  let playerIntroNextButton = new Clickable();
  playerIntroNextButton.id = 3
  playerIntroNextButton.textFont = bodyFont;
  playerIntroNextButton.width = 280;
  playerIntroNextButton.height = 100;
  playerIntroNextButton.text = "Begin Simulation";
  playerIntroNextButton.y = height - 130;
  playerIntroNextButton.x = width - 350;
  playerIntroNextButton.textSize = 14;
  playerIntroNextButton.color = "#c3cff7";
  playerIntroNextButton.stroke = "#011638";
  playerIntroNextButton.strokeWeight = 5;

  let nextSceneButton = new Clickable();
  nextSceneButton.id = 4;
  nextSceneButton.textFont = bodyFont;
  nextSceneButton.width = 280;
  nextSceneButton.height = 100;
  nextSceneButton.text = "Continue";
  nextSceneButton.y = height - 130;
  nextSceneButton.x = width/2 - 140;
  nextSceneButton.textSize = 14;
  nextSceneButton.color = "#c3cff7";
  nextSceneButton.stroke = "#011638";
  nextSceneButton.strokeWeight = 5;

  let resetButton = new Clickable();
  resetButton.id = 5;
  resetButton.textFont = bodyFont;
  resetButton.width = 280;
  resetButton.height = 100;
  resetButton.text = "Restart";
  resetButton.y = height - 130;
  resetButton.x = width/2 - 140;
  resetButton.textSize = 14;
  resetButton.color = "#c3cff7";
  resetButton.stroke = "#011638";
  resetButton.strokeWeight = 5;

  introButtons.push(homeStartButton, backButton, techIntroNextButton, 
      playerIntroNextButton, nextSceneButton, resetButton);
}

function setupIntroClickables() {
  for( let i = 0; i < introButtons.length; i++ ) {
    introButtons[i].onPress = clickablePressed;
    introButtons[i].onHover = clickableHover;
    introButtons[i].onOutside = clickableOutside;
  }
}

clickablePressed = function() {
  if(this.id === 0) {
    logoIdle = false;
  }
  else if(this.id === 2 || this.id === 3) {
    scene += 1;
  }
  else if (this.id === 4 || this.id === 5) {
    scene += 1;
    results = -1;
    updated = -1;
    resultsBoxHeight = 0;
    resultsBoxWidth = 0;
    innerBoxAlpha = 0;
    outerBoxAlpha = 100;
    resultDescAlpha = 255;
    vWidth = 5;
    mWidth = 5;
    gWidth = 5;
    zWidth = 5;
    if (this.id === 5) {
      scene = -1;
    }
  }
  else {
    scene -= 1;
  }
}

clickableHover = function(){
  this.width = 350;
  this.textSize = 25;
  if(this.id === 3) {
    this.x = width - 420;
  }
  else if (this.id === 0 || this.id === 4 || this.id === 5  || this.id === 2) {
    this.x = width/2 - 175;
  }
}

clickableOutside = function() {
  this.width = 280;
  this.textSize = 14;
  if (this.id === 3) {
    this.x = width - 350;
  }
  else if (this.id === 0 || this.id === 4 || this.id === 5 || this.id === 2) {
    this.x = width/2 - 140;
  }
}

// Each desc variable gives a brief overview of each character.
var viktorDesc = "Viktor Harding is the CEO of Next Gen Research (NGR), a world famous biotech company." +
" Depending on your choices, he may be interested in investing into nanobot research and development.";
var maliaDesc = "Malia Kealoha is an average middle class woman. Her job is just enough to get by, but she " +
" has a series of medical conditions she needs treatment for. NanoMed can be a great opportunity for her as " +
" a Hawaiian native.";
var gabrielDesc = "Gabriel Veers is a 12 year old boy from Michigan. He has Common Variable Immunodeficiency " +
"(CVID), which leaves him extremely vulnerable to infections. NanoMed could be a great help to him and others " +
"outside of Hawaii";
var zetaDesc = "Very little is known about the Zeta Collective. Is it one person? A Group? For now, it is assumed " +
"to be a group of malicious individuals that are deadset on stealing NanoMed's secrets. Exercise caution.";
// Will display the player introduction when the mouse hovers over a player icon in the player intro scene
function togglePlayerDesc() {
  textFont(bodyFont);
  textSize(18);
  rectMode(CENTER);
  textAlign(LEFT, CENTER);
  noStroke();
  let yCheck = mouseY >= (height/2 - 155) && mouseY <= (height/2 - 5);
  let viktorCheck = (mouseX >= (viktorX - 75) && mouseX <= (viktorX + 75) && yCheck);
  let maliaCheck = (mouseX >= (maliaX - 75) && mouseX <= (maliaX + 75) && yCheck);
  let gabrielCheck = (mouseX >= (gabrielX - 75) && mouseX <= (gabrielX + 75) && yCheck);
  let zetaCheck = (mouseX >= (zetaX - 75) && mouseX <= (zetaX + 75) && yCheck);

  if(viktorCheck || maliaCheck || gabrielCheck || zetaCheck) {
    fill(1, 22, 56, 220);
    stroke(255, 255, 255, 180);
    rect(width/2, height/2 + 150, 520, 360, 30);
    fill(27, 153, 138, 180);
    stroke('white');
    rect(width/2, height/2 + 150, 480, 320, 30);
    fill('white')
    noStroke();
    if(viktorCheck) {  
      text(viktorDesc, width/2, height/2 + 150, 400, 300);
    }
    else if (maliaCheck) {
      text(maliaDesc, width/2, height/2 + 150, 400, 300);
    }
    else if (gabrielCheck) {
      text(gabrielDesc, width/2, height/2 + 150, 400, 300);
    }
    if(zetaCheck) {  
      text(zetaDesc, width/2, height/2 + 150, 400, 300);
    }
  } 
}

function draw() {
  background('#0A2463');  
  imageMode(CENTER);
  drawScene();
  
}

// Draws the animations and whole scene for the player intro scene
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
// Draws the starting animation for the player icons in the player intro scene
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

// The randomly selected event that defines the current scene
let randomIndex = -1;
// This function will display a randomly selected event for each scene in the scene manager.
// Will display the title of the event, a small description, and two decision buttons.
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
    strokeWeight(3);
    stroke(255, 255, 255, 120);
    fill("#6290C8");
    rect(450, height/2, 625, 325, 30);
    noStroke();
    fill("#011638");
    rect(450, height/2, 600, 300, 30);

    textSize(19);
    fill('white')
    textFont(bodyFont);
    textAlign(LEFT, CENTER);
    text(sceneElements.sceneDescriptions[randomIndex/2], 450, height/2, 500, 450);
    drawCurrentSceneClickables(randomIndex);
  }
}

// This variable is updated with the ID of the selected choice from the end of the scene. This is
// used to determine what the results page after the selection should look like.
var selectedID = -1;
sceneClickablePressed = function () {
  randomIndex = -1;
  selectedID = this.id;
  results = 1;
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

// Draws all the Clickable buttons for the current scene defined by the scene's unique clickable array
function drawCurrentSceneClickables(clickableIndex) {
  let currSceneClickables = sceneManager.getClickables(clickableIndex, scene);
  if(currSceneClickables != undefined) {
    for(let i = 0; i < currSceneClickables.length; i++) {
      currSceneClickables[i].textFont = bodyFont;
      currSceneClickables[i].textSize = 14;
      currSceneClickables[i].textScaled = true;
      currSceneClickables[i].color = "#c3cff7";
      currSceneClickables[i].stroke = "#011638";
      currSceneClickables[i].strokeWeight = 5;
      currSceneClickables[i].draw();
      currSceneClickables[i].onPress = sceneClickablePressed;
      currSceneClickables[i].onHover = sceneClickableHover;
      currSceneClickables[i].onOutside = sceneClickableOutside;
    }
  }
}

// Draws a pyramid of nanobots offscreen that are used for the intro animation
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

// Determines when the pyramid animation is over to trigger further events
var pyramidFinished = false;
// Opacity of the title for the intro scene
var titleAlpha = 0;
// Determines when the first nanobot of the pyramid reaches the end point, will trigger
// the title and main nanobot to appear on the screen
var firstFinished = false;
// Y position of the main nanobot for demonstration in the intro scene.
var mainNanobotStartY = -100;
var mainNanobotStartY2 = -100;
function techIntroduction() {
  if(firstFinished) {
    image(nanoSearch, width/2 - 80, mainNanobotStartY, 150, 161);
    image(nanoOperation, width/2 + 80, mainNanobotStartY2, 150, 269);
    if(mainNanobotStartY2 < height/2) {
      mainNanobotStartY2 += 10;
    }
    if(mainNanobotStartY < (height/2 - 45)) {
      mainNanobotStartY += 10;
     
    }
    else {
      textAlign(CENTER, CENTER);
      textFont(titleFont);
      textSize(40);
      noStroke();
      fill(255, 255, 255, titleAlpha);
      stroke(0, 0, 0, titleAlpha);
      strokeWeight(2);
      text("Nano-Med: Nanotechnology for Medical Aid\n- Based in Hawaii -", width/2, techTitleY);
      if(titleAlpha < 255) {
        titleAlpha += 15;
      }
      if(techTitleY > 88) {
        techTitleY -= 12;
      }
      else {
        pyramidFinished = true;
        textFont(bodyFont);
        textSize(24);
        fill('white');
        text("Nanobot Search Mode", width/2 - 350, height/2 - 100);
        text("Nanobot Operation Mode", width/2 + 350, height/2 - 100);
        textAlign(LEFT, CENTER);
        textSize(18);
        noStroke();
        text("A versatile nanobot designed to traverse the body as efficiently as possible", width/2 - 430,
        height/2 - 60, 200, 150);
        textAlign(RIGHT, CENTER);
        text("Can toggle into operation mode to perform surgical procedures and administer aid from within the body.", 
        width/2 + 230, height/2 - 60, 200, 150);
      }
    }
    
  }

  for(let i = 0; i < nanobotPyramid.length; i++) {
    let nanoLayer = nanobotPyramid[i];
    for(let j = 0; j < nanoLayer.length; j++) {
      image(nanoSearch, nanoLayer[j].x, nanoLayer[j].y, 100, 108);
      if(nanoLayer[j].y < height + 100) {
        nanoLayer[j].y = nanoLayer[j].y + 8;
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

// Width values of each player profile icon for the results page
var mWidth = 5;
var gWidth = 5;
var vWidth = 5;
var zWidth = 5;

// Displays the player icons for the results page
function playerResultsPage() {
  noStroke();
  ellipseMode(CENTER);
  fill("#6F58C9");
  ellipse(leftX, iconTopY, mWidth + 15);
  image(mImg, leftX, iconTopY, mWidth, mWidth);
  fill("#6F58C9");
  ellipse(leftX, iconBottomY, gWidth + 15);
  image(gImg, leftX, iconBottomY, gWidth, gWidth);
  fill("#6F58C9");
  ellipse(rightX, iconTopY, vWidth + 15);
  image(vImg, rightX, iconTopY, vWidth, vWidth);
  fill("#6F58C9");
  ellipse(rightX, iconBottomY, zWidth + 15);
  image(zImg, rightX, iconBottomY, zWidth, zWidth);
}

// Shows any changes to the score of each player when their icons are hovered over.
function showScoreUpdates(player) {
  let firstUpdate, secondUpdate, xVal, bounds1, bounds2;
  let playerName = player.getName.toLowerCase();
  let yVal = (playerName === "malia" || playerName === "viktor") ? 
      (iconTopY + 40) : (iconBottomY + 40);
  if (playerName === "malia" || playerName === "gabriel") {
    firstUpdate = "Satisfaction: " + player.getSatisfactionTag;
    secondUpdate = "Health: " + player.getHealthTag;
    xVal = leftX + 255;
  }
  else if (playerName === "viktor" || playerName === "zeta") {
    if (playerName === "viktor") {
      firstUpdate = "Satisfaction: " + player.getSatisfactionTag;
      secondUpdate = "Interest: " + player.getInterestTag;
    }
    else if (playerName === "zeta") {
      firstUpdate = "Interest: " + player.getInterestTag;
      secondUpdate = "Danger: " + player.getDangerTag;
    }
    xVal = rightX - 255;
  }
  bounds1 = bodyFont.textBounds(firstUpdate, xVal, yVal, 15);
  bounds2 = bodyFont.textBounds(secondUpdate, xVal, (yVal + 90), 15);
  rectMode(CENTER);
  stroke(255, 255, 255, 200);
  strokeWeight(2);
  fill('#011638');
  rect(xVal, (yVal), (bounds1.w + 60), (bounds1.h + 20), 20);
  rect(xVal, (yVal + 45), (bounds2.w + 60), (bounds2.h + 20), 20);
  noStroke();
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(15);
  text(firstUpdate, xVal, yVal);
  text(secondUpdate, xVal, yVal + 45);
}

// Shows a full score display by printing the tagline of each player that is unique after 
// a decision is made and that also displays the numerical/comments of updated scores.
function displayScore(scores) {
  let topYCheck = mouseY <= (iconTopY + 62) && mouseY >= (iconTopY - 62);
  let bottomYCheck = mouseY <= (iconBottomY + 62) && mouseY >= (iconBottomY - 62);
  let leftXCheck = mouseX <= (leftX + 62) && mouseX >= (leftX - 62);
  let rightXCheck = mouseX <= (rightX + 62) && mouseX >= (rightX - 62);
  textFont(bodyFont);

  if((leftXCheck && topYCheck) || (leftXCheck && bottomYCheck) ||
     (rightXCheck && topYCheck) || (rightXCheck && bottomYCheck)) {
      innerBoxAlpha = 50;
      outerBoxAlpha = 50;
      resultDescAlpha = 50;
  }
  else {
    innerBoxAlpha = 180;
    outerBoxAlpha = 100;
    resultDescAlpha = 255;
  }

  if (leftXCheck && topYCheck) {
    mWidth = 130;
    showScoreUpdates(malia);
    rectMode(CORNER);
    strokeWeight(3);
    stroke(255, 255, 255, 200);
    fill('#6F58C9');
    rect(leftX + 90, iconTopY - 90, 330, 100, 20);
    noStroke();
    fill('#d3fff3');
    rect(leftX + 100, iconTopY - 80, 310, 80, 15);
    fill('black');
    textSize(12);
    textAlign(CENTER, CENTER);
    text((scores[1].comment === "...") ? "No changes." : scores[1].comment, 
          leftX + 110, iconTopY - 75, 290, 70);
  } 
  else {
    mWidth = 90;
  }

  if (leftXCheck && bottomYCheck) {
    gWidth = 130;
    showScoreUpdates(gabriel);
    rectMode(CORNER);
    strokeWeight(3);
    stroke(255, 255, 255, 200);
    fill('#6F58C9');
    rect(leftX + 90, iconBottomY - 90, 330, 100, 20);
    noStroke();
    fill('#d3fff3');
    rect(leftX + 100, iconBottomY - 80, 310, 80, 15);
    fill('black');
    textSize(12);
    text((scores[2].comment === "...") ? "No changes." : scores[2].comment, 
          leftX + 110, iconBottomY - 75, 290, 70);
  } 
  else {
    gWidth = 90;
  }

  if (rightXCheck && topYCheck) {
    vWidth = 130;
    showScoreUpdates(viktor);
    rectMode(CORNER);
    strokeWeight(3);
    stroke(255, 255, 255, 200);
    fill('#6F58C9');
    rect(rightX - 420, iconTopY - 90, 330, 100, 20);
    noStroke();
    fill('#d3fff3');
    rect(rightX - 410, iconTopY - 80, 310, 80, 15);
    fill('black');
    textSize(12);
    text((scores[0].comment === "...") ? "No changes." : scores[0].comment, 
          rightX - 400, iconTopY - 75, 290, 70);
  } 
  else {
    vWidth = 90;
  }

  if (rightXCheck && bottomYCheck) {
    zWidth = 130;
    showScoreUpdates(zeta);
    rectMode(CORNER);
    strokeWeight(3);
    stroke(255, 255, 255, 200);
    fill('#6F58C9');
    rect(rightX - 420, iconBottomY - 90, 330, 100, 20);
    noStroke();
    fill('#d3fff3');
    rect(rightX - 410, iconBottomY - 80, 310, 80, 15);
    fill('black');
    textSize(12);
    text((scores[3].comment === "...") ? "No changes." : scores[3].comment, 
          rightX - 400, iconBottomY - 75, 290, 70);
  } 
  else {
    zWidth = 90;
  }
  noStroke();
}

// Updates player scores based on the previous scene's selection
function updatePlayerScores(updateArray) {
  viktor.setSatisfaction(updateArray[0].change1);
  viktor.setInterest(updateArray[0].change2);
  malia.setSatisfaction(updateArray[1].change1);
  malia.setHealth(updateArray[1].change2);
  gabriel.setSatisfaction(updateArray[2].change1);
  gabriel.setHealth(updateArray[2].change2);
  zeta.setInterest(updateArray[3].change1);
  zeta.setDanger(updateArray[3].change2);
  updated = 1;
}

// Height of outer box for animation
var resultsBoxHeight = 0;
// Width of inner box for animation
var resultsBoxWidth = 0;
// Opacity of inner box
var innerBoxAlpha = 0;
// Opacity of outer box
var outerBoxAlpha = 100;
// Opacity of result text
var resultDescAlpha = 255;

// Draws the entire page of results based on the previously selected decision 
function drawResults() {
  background('#011638');
  textAlign(CENTER, CENTER);
  rectMode(CORNER);
  if(scene === 2) {
    introButtons[5].draw();
  }
  else {
    introButtons[4].draw();
  }
  setupIntroClickables();
  let sceneElements = sceneManager.getScene(scene);
  let results = sceneElements.sceneDecisionResults[selectedID];
  fill('white');
  textFont(titleFont)
  textSize(40);
  text(results.title, width/2, 80);
  if(updated === -1) {
    console.log(results.scores);
    console.log("Previous player scores:");
    console.log("Viktor: Satisfaction - " + viktor.getSatisfactionTag + ",\tInterest: " + viktor.getInterestTag);
    console.log("Malia: Satisfaction - " + malia.getSatisfactionTag + ",\t Health: " + malia.getHealthTag);
    console.log("Gabriel: Satisfaction - " + gabriel.getSatisfactionTag + ",\t Health: " + gabriel.getHealthTag);
    console.log("Zeta: Interest- " + zeta.getInterestTag + ",\tDanger: " + zeta.getDangerTag);
    updatePlayerScores(results.scores);
    console.log("Updated player scores:");
    console.log("Viktor: Satisfaction - " + viktor.getSatisfactionTag + ",\tInterest: " + viktor.getInterestTag);
    console.log("Malia: Satisfaction - " + malia.getSatisfactionTag + ",\t Health: " + malia.getHealthTag);
    console.log("Gabriel: Satisfaction - " + gabriel.getSatisfactionTag + ",\t Health: " + gabriel.getHealthTag);
    console.log("Zeta: Interest- " + zeta.getInterestTag + ",\tDanger: " + zeta.getDangerTag);
  }
  rectMode(CENTER);
  fill(27, 153, 138, outerBoxAlpha);
  rect(width/2, height/2, 750, resultsBoxHeight, 30);
  if (resultsBoxHeight < 350) {
    resultsBoxHeight += 15;
  } else {
    fill(211, 255, 243, innerBoxAlpha);
    rect (width/2, height/2, resultsBoxWidth, 330, 20);
    if(resultsBoxWidth < 720) {
        resultsBoxWidth += 48;
        innerBoxAlpha += 12;
    }
    else {
      fill(0, 0, 0, resultDescAlpha);
      textFont(bodyFont);
      textAlign(CENTER, CENTER);
      noStroke();
      textSize(20)
      text(results.description, width/2, height/2, 600, 300);
      playerResultsPage();
      if (zWidth < 90) {
        mWidth += 5;
        gWidth += 5;
        vWidth += 5;
        zWidth += 5;
      }
      else {
        displayScore(results.scores);
      }
    }
  }
}

// Y position for logo on first scene
var logoY = 280
// Y speed to control the bobbing animation of the logo
var logoYSpeed = 0.2;
// Determines whether the logo should stop bobbing and go off screen

// Main method for drawing all scenes and introductions.
var logoIdle = true;
function drawScene() {
  if (scene === -2) {
    background(lerpColor(color1, color2, transitionStep));
    if(logoIdle) {
      rectMode(CORNER);
      textAlign(CENTER, CENTER);
      introButtons[0].draw();
      setupIntroClickables();
      image(logoImg, width/2, logoY, 800, 210);
      logoY += logoYSpeed;
      if(logoY > 290) {
        logoYSpeed = -0.2;
      }
      if(logoY < 270) {
        logoYSpeed = 0.2;
      }
    }
    else {
      if(logoY > 0) {
        image(logoImg, width/2, logoY, 800, 210);
        logoY -= 10;
      } 
      if(transitionStep < 1) {
        transitionStep += 0.02;
      }
      techIntroduction();
      if(pyramidFinished) {
        setupIntroClickables();
        rectMode(CORNER);
        textAlign(CENTER, CENTER);
        introButtons[2].draw();
      }
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
  else {
    if(results === -1) {
      drawSceneElements();
    } else {
      drawResults();
    }
  }
}