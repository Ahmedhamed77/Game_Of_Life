
class Food{

    showFood(){
        fill(255,0,100);
        rect(this.x , this.y , scl , scl);
    }

    pickLocation(){
        let randomX = floor(random(0,(5000-scl)/scl));
        let randomY = floor(random(0,(5000-scl)/scl));

        this.x = randomX * scl;
        this.y = randomY * scl;
    }

}
