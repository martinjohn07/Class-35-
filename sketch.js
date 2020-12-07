var ball;
var myDB,position;
function setup(){
    createCanvas(500,500);
    //setting up the database
    myDB = firebase.database()

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

//read the position of the ball - 1) ref() 2) on() 3) val()
    var positionOfBall = myDB.ref("ball/position") //refer to the position of ball
    positionOfBall.on("value",readTheValue)//set up a listener to listen to the value

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
//updating to data base-- .set() or .update()
    myDB.ref("ball/position").set({
        x: ball.x + x,
        y: ball.y + y
    })
}


function readTheValue (data){
    position = data.val()//read the position
    ball.x = position.x
    ball.y = position.y
}




