class Player {
    constructor(name, filepath) {
        this.name = name;
        this.satisfaction = 100;
        this.interest = 0;
        this.health = 100;
        this.danger = 0;
        this.thumbnail = filepath;
    }

    get getInterestTag() {
        if(this.interest < 50){
            return "Intrigued (" + this.interest + ")";
        } 
        else {
            return "Heavily Invested (" + this.interest + ")";
        }
    }

    get getSatisfactionTag() {
        if(this.satisfaction < 25){
            return "Disatisfied (" + this.satisfaction + ")";
        } 
        else if (this.satisfaction < 50 && this.satisfaction >= 25) {
            return "OK (" + this.satisfaction + ")";
        }
        else if (this.satisfaction < 75 && this.satisfaction >= 50) {
            return "Happy (" + this.satisfaction + ")";
        }
        else {
            return "Ecstatic (" + this.satisfaction + ")";
        }
    }

    get getHealthTag() {
        if(this.health < 25){
            return "Critical Condition (" + health + ")";
        } 
        else if (this.health >= 25 && this.health < 50) {
            return "Unhealthy (" + this.health + ")";
        }
        else if (this.health >= 50 && this.health < 75) {
            return "Satisfactory (" + this.health + ")";
        }
        else {
            return "Healthy (" + this.satisfaction + ")";
        }
    }

    get getDangerTag() {
        if(this.health < 25){
            return "No Threat (" + this.danger + ")";
        } 
        else if (this.danger >= 25 && this.danger < 50) {
            return "Liability (" + this.danger + ")";
        }
        else if (this.danger >= 50 && this.danger < 75) {
            return "Harmful (" + this.danger + ")";
        }
        else {
            return "Critical (" + this.danger + ")";
        }
    }

    get getInterestValue() {
        return this.interest;
    }

    get getSatisfactionValue() {
        return this.satisfaction;
    }

    get getHealthValue() {
        return this.health;
    }

    get getDangerValue() {
        return this.danger;
    }

    get getThumbnail() {
        return this.thumbnail;
    }

    /**
     * @param {number} value
     */
    set setInterest(value) {
        this.interest += value;
    }   

    /**
     * @param {number} value
     */
     set setHealth(value) {
        this.interest += value;
    }  

    /**
     * @param {number} value
     */
     set setDanger(value) {
        this.danger += value;
    }   

    /**
     * @param {number} value
     */
     set setSatisfaction(value) {
        this.satisfaction += value;
    } 
}