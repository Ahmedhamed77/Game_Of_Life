let animals = []; // animals object
let yda = [];

function setup() { //setup p5 to create canvas

    createCanvas(5000, 5000);

    for (let i = 0; i < 1000; i++) {
        let animal = new Animal();
        animals.push(animal);
    }
    for (let i = 0; i < 1; i++) {
        let food = new Food();
        yda.push(food);
        food.pickLocation();
    }

    frameRate(20); // 20 FPS=
}


function draw() { //draw function from p5 to draw no canvas
    background(51);

    yda.forEach(f => {
        f.showFood();
    });

    animals.forEach(a => {
        a.show();
        let r = floor(random(8));

        if(a.starvation > 98){
            a.moveRandomly(r);
        }
        else {
            a.moveToUnvisitedPlace();
            yda.forEach( function (f,i) {
                if(a.eat(f)){
                    // f.pickLocation();
                    yda.splice(i,1);
                }
            });
        }


    });
}


