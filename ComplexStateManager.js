class ComplexStateManager {
    constructor(dataFiles) {
        this.states = [];
        if (dataFiles.constructor === Array) {
            this.loadTablesFromFiles(dataFiles);
        }
        else if (dataFiles.constructor === String) {
            this.loadTableFromFile(dataFiles);
        }
        else {
            console.log("Invalid parameter to construct states, must be array or string");
        }
    }

    loadTablesFromFiles(files) {
        for(let i = 0; i < files.length; i++) {
            this.loadTableFromFile(files[i]);
        }
        console.log(this.states);
    }

    loadTableFromFile(file) {
        let sceneNumber = file.split('/')[1];
        let basePath = file + '/' + sceneNumber;
        let elementsPath = basePath + 'Elements.csv';
        let clickablesPath = basePath + 'Clickables.csv'
        let sceneObject = {
            statesDescFilePath: elementsPath,
            clickablesFilePath: clickablesPath,
            stateTable: loadTable(elementsPath),
            sceneTitles: [],
            sceneDescriptions: [],
            sceneClickableManager: new ClickableManager(clickablesPath),
            sceneClickableArray: []
        }
        this.states.push(sceneObject);
    }

    buildAllStates() {
        console.log(this.states[0].stateTable.getString(2,0));
        for(let i = 0; i < this.states.length; i++) {
            let currClickableManager = this.states[i].sceneClickableManager;
            let currStateDescTable = this.states[i].stateTable;
            this.states[i].sceneClickableArray = currClickableManager.setup();
            this.fillStrings(i, currStateDescTable);
        }
        console.log(this.states);
    }

    fillStrings(index, table) {
        for(let i = 1; i < 5; i++) {
            this.states[index].sceneTitles.push(table.getString(i,0));
            this.states[index].sceneDescriptions.push(table.getString(i,1));
        }
    }



    getClickables(clickableIndex, stateIndex) {
        if(clickableIndex >= 0 && clickableIndex % 2 === 0 &&
           clickableIndex < this.states[stateIndex].sceneClickableArray.length - 1) {
            rectMode(CORNER);
            textAlign(CENTER, CENTER);
            let leftButton = 
                this.states[stateIndex].sceneClickableArray[clickableIndex];
            let rightButton = 
                this.states[stateIndex].sceneClickableArray[clickableIndex+1];
            return [leftButton, rightButton];
        }
    }

    getScene(index) {
        if(index < this.states.length){
            return this.states[index];
        }
        else {
            return null;
        }
    }
}