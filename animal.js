const scl = 10; // width and height of the animal
let stepHistory = []; //saving the steps of the animal when it starts to search on food


class Animal {
    x;
    y;
    starvation;
    randomX = floor(random(0, 5000 / scl));
    randomY = floor(random(0, 5000 / scl));
    stopThisInterval;

    xt = []; //testing the animal while eating , Tracker path
    yt = [];
    vec = []; // to create a teleport so the animal will move to another point.

    constructor() {
        this.x = this.randomX * scl;
        this.y = this.randomY * scl;
        this.starvation = 100;
        this.stopThisInterval = setInterval(() => this.reduceHunger(), 5000); //sending the func in setinterval to work every 5 seconds
    }


    show() {

     /* for (let i = 0; i < this.xt.length; i++) { // drawing the tracker path , for tracking the animal when it start to search on food
            fill(130);
            rect(this.xt[i], this.yt[i], scl, scl);
        }*/

        fill(255);
        rect(this.x, this.y, scl, scl);


    }


    moveRandomly(r) {
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

    eat(pos) {
        let d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.starvation = 100;
            while (stepHistory.length > 0) {
                stepHistory.pop();
            }
           /* while (this.xt.length > 0) { // to empty the tracker arr
                this.xt.pop();
                this.yt.pop();
            }*/
            return true;
        } else {
            return false;
        }

    }

    reduceHunger() {
        this.starvation--;
       /* if (this.starvation === 50) {
            console.log("500");
        }*/
        if (this.starvation === 0) {
            clearInterval(this.stopThisInterval);
            let index = animals.indexOf(this);
            animals.splice(index, 1);
            console.log("deleted one animal");
            console.log(animals.length);
        }
    }




    moveToUnvisitedPlace() {

        let currentX = this.x;
        let currentY = this.y;
        let rand = floor(random(8));
        this.moveRandomly(rand); //

        let stringX = this.x.toString();
        let stringY = this.y.toString();
        let stringXY = stringX + "," + stringY;


        let i = 0;
        for (; i < 20; i++) {
            if (!stepHistory.includes(stringXY)) {
                stepHistory.push(stringXY);
                this.vec.push(createVector(this.x, this.y))
                break;
            } else {
                this.x = currentX;
                this.y = currentY;
                this.moveRandomly(floor(random(8)));
                stringX = this.x.toString();
                stringY = this.y.toString();
                stringXY = stringX + "," + stringY;
            }
        }
        if (stepHistory.length > 200) {
            while (stepHistory.length > 0) {
                stepHistory.pop();
            }
            while (this.vec.length > 0) {
                this.vec.pop();
            }

          /*  while (this.xt.length > 0) {
                this.xt.pop();
                this.yt.pop();
            }*/

            return
        }
        if (i === 20) {
            this.vec.sort(this.compareVectors); //sorting the vec arr using the compare func
            if (this.x > 2500) {//in the right half
                this.x = this.vec[0].x;//teleport him to the most left
                this.y = this.vec[0].y;
            } else {//in the left half
                this.x = this.vec[this.vec.length - 1].x;//teleport him to the most right
                this.y = this.vec[this.vec.length - 1].y;
            }

            // let str = stepHistory[0];
            // this.x = parseInt(str.split(',')[0]);
            // this.y = parseInt(str.split(',')[1]);


        } /*else {
            this.xt.push(this.x);
            this.yt.push(this.y);
        }*/
    }

    compareVectors(a, b) {  //
        return a.x - b.x || a.y - b.y;
    }
}