const scl = 10; // width and height of the animal

class Animal {
    x;
    y;
    starvation;
    randomX = floor(random(0,5000/scl));
    randomY = floor(random(0,5000/scl));
    stopThisInterval;
    constructor() {
        this.x = this.randomX * scl;
        this.y = this.randomY * scl;
        this.starvation =100;
        this.stopThisInterval = setInterval(() => this.reduceHunger(),50000);
    }


    show() {
        fill(255);
        rect(this.x, this.y, scl, scl);
    }


    move(r) {
        switch (r) {
            case 0: // right
                this.x = this.x + scl;
                break;
            case 1: // left
                this.x = this.x - scl;
                break;
            case 2: //down
                this.y = this.y + scl;
                break;
            case 3: // up
                this.y = this.y - scl;
                break;
            case 4: // up right
                this.x = this.x + scl;
                this.y = this.y - scl;
                break;
            case 5: // up left
                this.x = this.x - scl;
                this.y = this.y - scl;
                break;
            case 6: //down right
                this.x = this.x + scl;
                this.y = this.y + scl;
                break;
            case 7: // down left
                this.x = this.x - scl;
                this.y = this.y + scl;
                break;

        }
        this.x = constrain(this.x, 0, 5000 - scl); // keep the animal inside the frame
        this.y = constrain(this.y, 0, 5000 - scl);
    }

    eat (pos){
        let d = dist(this.x , this.y , pos.x , pos.y);
        if(d < 1){
            return true;
        }else {
            return  false;
        }
    }

    reduceHunger(){
        this.starvation --;
        if(this.starvation === 0){
            clearInterval(this.stopThisInterval);
            let index = animals.indexOf(this);
            animals.splice(index, 1);
            console.log("deleted one animal");
            console.log(animals.length);
        }
    }


}