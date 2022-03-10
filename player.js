/*************************************************************************
    Player Class
      By Luis Sanchez
    Overview - This class demonstrates how a player in the game works. Each
    player has a satisfaction, interest, health, and danger variable that
    will be used for scoring.
**************************************************************************/
class Player {
    constructor(name, filepath) {
        this.name = name;
        this.satisfaction = 0;
        this.interest = 0;
        this.health = 0;
        this.danger = 0;
        this.thumbnail = filepath;
    }

    /**
     * Returns the saved name of a Player object
     */
    get getName() {
        return this.name;
    }

    /**
     * Returns a string corresponding to the numeric value of the interest variable
     */
    get getInterestTag() {
        if(this.interest < 25) {
            return "Uninterested ~ " + this.interest;
        }
        else if(this.interest < 50 && this.interest >= 25){
            return "Intrigued ~ " + this.interest;
        } 
        else {
            return "Heavily Invested ~ " + this.interest;
        }
    }

    /**
     * Returns a string corresponding to the numeric value of the satisfaction variable
     */
    get getSatisfactionTag() {
        if(this.satisfaction < 25){
            return "Disatisfied ~ " + this.satisfaction;
        } 
        else if (this.satisfaction < 50 && this.satisfaction >= 25) {
            return "OK ~ " + this.satisfaction;
        }
        else if (this.satisfaction < 75 && this.satisfaction >= 50) {
            return "Happy ~ " + this.satisfaction;
        }
        else {
            return "Ecstatic ~ " + this.satisfaction;
        }
    }

    /**
     * Returns a string corresponding to the numeric value of the health variable
     */
    get getHealthTag() {
        if(this.health < 25){
            return "Critical Condition ~ " + this.health;
        } 
        else if (this.health >= 25 && this.health < 50) {
            return "Unhealthy ~ " + this.health;
        }
        else if (this.health >= 50 && this.health < 75) {
            return "Satisfactory ~ " + this.health;
        }
        else {
            return "Healthy ~ " + this.health;
        }
    }

    /**
     * Returns a string corresponding to the numeric value of the danger variable
     */
    get getDangerTag() {
        if(this.danger < 25){
            return "No Threat ~ " + this.danger;
        } 
        else if (this.danger >= 25 && this.danger < 50) {
            return "Liability ~ " + this.danger;
        }
        else if (this.danger >= 50 && this.danger < 75) {
            return "Harmful ~ " + this.danger;
        }
        else {
            return "Critical ~ " + this.danger;
        }
    }

    /**
     * Returns the interest value
     */
    get getInterestValue() {
        return this.interest;
    }

    /**
     * Returns the satisfaction value
     */
    get getSatisfactionValue() {
        return this.satisfaction;
    }
    
    /**
     * Returns the health value
     */
    get getHealthValue() {
        return this.health;
    }

    /**
     * Returns the danger value
     */
    get getDangerValue() {
        return this.danger;
    }

    /**
     * Returns the thumbnail filepath
     */
    get getThumbnail() {
        return this.thumbnail;
    }

    /**
     * Increments/decrments the interest to a value from 0-100
     * @param {number} value
     */
    setInterest(value) {
        if(this.interest === 100) {
            if(value < 0) {
                this.interest += value;
            }
        }
        else if (this.interest === 0) {
            if (value > 0) {
                this.interest += value;
            }
        }
        else if (this.interest + value > 100) {
            this.interest = 100;
        }
        else if (this.interest + value < 0) {
            this.interest = 0;
        }
        else {
            this.interest += value;
        }
    }   

    /**
     * Increments/decrments the health to a value from 0-100
     * @param {number} value
     */
    setHealth(value) {
        if(this.health === 100) {
            if(value < 0) {
                this.health += value;
            }
        }
        else if (this.health === 0) {
            if (value > 0) {
                this.health += value;
            }
        }
        else if (this.health + value > 100) {
            this.health = 100;
        }
        else if (this.health + value < 0) {
            this.health = 0;
        }
        else {
            this.health += value;
        }
    }  

    /**
     * Increments/decrments the danger to a value from 0-100
     * @param {number} value
     */
    setDanger(value) {
        if(this.danger === 100) {
            if(value < 0) {
                this.danger += value;
            }
        }
        else if (this.danger === 0) {
            if (value > 0) {
                this.danger += value;
            }
        }
        else if (this.danger + value > 100) {
            this.danger = 100;
        }
        else if (this.danger + value < 0) {
            this.danger = 0;
        }
        else {
            this.danger += value;
        }
    }   

    /**
     * Increments/decrments the satisfaction to a value from 0-100
     * @param {number} value
     */
    setSatisfaction(value) {
        if(this.satisfaction === 100) {
            if(value < 0) {
                this.satisfaction += value;
            }
        }
        else if (this.satisfaction === 0) {
            if (value > 0) {
                this.satisfaction += value;
            }
        }
        else if (this.satisfaction + value > 100) {
            this.satisfaction = 100;
        }
        else if (this.satisfaction + value < 0) {
            this.satisfaction = 0;
        }
        else {
            this.satisfaction += value;
        }
    } 
}