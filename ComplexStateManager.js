/*************************************************************************
    Complex Scene Manager
      By Luis Sanchez
    Overview - This class is in charge of creating a state machine structure that 
    will store an array of complex "scenes" for the Interactive NanoMed Experience.
    The constructor expects either an array of filepath strings or a single 
    filepath string, it won't work with any other parameter.
    
    **THIS WILL ONLY WORK WITH A VERY SPECIFIC CSV STRUCTURE**

    The manager will expect the filepaths to lead to 'scene' folders that consist
    of 3 parts:
        1.) scene[]Elements - This will denote all the possible branching decisions 
            presented during a given scene.
        2.) scene[]Clickables - This will describe all the p5 Clickable buttons that
            correspond to whatever decision was selected from the elements csv file.
        3.) scene[]Results - This will describe all the results for each Clickable
            button defined in the clickables csv file.
**************************************************************************/
class ComplexSceneManager {
    constructor(dataFiles) {
        // The scenes variable holds all the collected scenes for the game.
        this.scenes = [];
        if (dataFiles.constructor === Array && dataFiles[0].constructor === String) {
            // Load all the tables for each scene at once.
            this.loadTablesFromFiles(dataFiles);
        }
        else if (dataFiles.constructor === String) {
            // Load the table for a singular given scene.
            this.loadTableFromFile(dataFiles);
        }
        else {
            console.log("Invalid parameter to construct states, must be array or string");
        }
    }

    /**
     * This will call loadTableFromFile to load all the tables needed for a scene
     * for each 'scene' folder in the given 'files' array.
     * @param {Array} files 
     */
    loadTablesFromFiles(files) {
        for(let i = 0; i < files.length; i++) {
            this.loadTableFromFile(files[i]);
        }
        console.log(this.scenes);
    }

    /**
     * This method will fill the scenes array with a unique sceneObject that 
     * contains all the data necessary to display a scene and the results 
     * corresponding to that scene after a selection is made.
     * 
     * @param {String} file 
     */
    loadTableFromFile(file) {
        let sceneNumber = file.split('/')[1];
        let basePath = file + '/' + sceneNumber;
        // File path to the sceneElements csv
        let elementsPath = basePath + 'Elements.csv';
        // File path to the sceneClickables csv
        let clickablesPath = basePath + 'Clickables.csv';
        // File path to the sceneResults csv
        let resultsPath = basePath + 'Results.csv';
        let sceneObject = {
            resultsTable: loadTable(resultsPath),
            sceneDecisionResults: [],
            stateTable: loadTable(elementsPath),
            sceneTitles: [],
            sceneDescriptions: [],
            sceneClickableManager: new ClickableManager(clickablesPath),
            sceneClickableArray: []
        }
        this.scenes.push(sceneObject);
    }

    /**
     * Sets up the clickables using the built in setup metho and fills in the
     * necesssary scene information using the fillStrings method.
     */
    buildAllStates() {
        console.log(this.scenes[0].stateTable.getString(2,0));
        for(let i = 0; i < this.scenes.length; i++) {
            let currClickableManager = this.scenes[i].sceneClickableManager;
            this.scenes[i].sceneClickableArray = currClickableManager.setup();
            this.fillStrings(i);
        }
        console.log(this.scenes);
    }

    /**
     * This method is in charge of loading up the title of the scene, the description 
     * of the scene, all the relevant information for the results.
     * 
     * @param {number} index 
     */
    fillStrings(index) {
        let currStates = this.scenes[index].stateTable;
        for(let i = 1; i < currStates.getRowCount(); i++) {
            this.scenes[index].sceneTitles.push(currStates.getString(i,0));
            this.scenes[index].sceneDescriptions.push(currStates.getString(i,1));
        }
        let currResults = this.scenes[index].resultsTable;
        for(let i = 1; i < currResults.getRowCount(); i++) {
            let scoreArray = []
            for(let j = 3; j < 7; j++) {
                let playerName = currResults.getString(0, j)
                let scoreBlock = currResults.getString(i, j).split('/');
                let scoreChange1 = parseInt(scoreBlock[0].split(',')[0]);
                let scoreChange2 = parseInt(scoreBlock[0].split(',')[1]);
                let scoreChangeTagline = scoreBlock[1];
                scoreArray.push({
                    name: playerName,
                    change1: scoreChange1,
                    change2: scoreChange2,
                    comment: scoreChangeTagline
                })
            }
            this.scenes[index].sceneDecisionResults.push({
                ID: currResults.getString(i, 0),
                title: currResults.getString(i, 1),
                description: currResults.getString(i, 2),
                scores: scoreArray
            })
        }
    }

    /**
     * Returns the two Clickable buttons corresponding to a scene.
     * @param {number} clickableIndex 
     * @param {number} stateIndex 
     * 
     * @returns An array of two Clickable objects
     */
    getClickables(clickableIndex, stateIndex) {
        if(clickableIndex >= 0 && clickableIndex % 2 === 0 &&
           clickableIndex < this.scenes[stateIndex].sceneClickableArray.length - 1) {
            rectMode(CORNER);
            textAlign(CENTER, CENTER);
            let leftButton = 
                this.scenes[stateIndex].sceneClickableArray[clickableIndex];
            let rightButton = 
                this.scenes[stateIndex].sceneClickableArray[clickableIndex+1];
            return [leftButton, rightButton];
        }
    }

    /**
     * This method gets a scene corresponding to a given index.
     * 
     * @param {number} index 
     * @returns The scene object to draw
     */
    getScene(index) {
        if(index < this.scenes.length){
            return this.scenes[index];
        }
        else {
            return null;
        }
    }
}