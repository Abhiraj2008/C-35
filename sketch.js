var paddle;
var database , position ;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    paddle = createSprite(250,250,10,10);
    paddle.shapeColor = "red";

    var paddlePosition = database.ref("ball/position");
    paddlePosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if (position !== null){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
        
    }
    drawSprites();
}

function writePosition(x,y){
   database.ref("ball/position").set({
       'x': position.x + x,
       'y': position.y + y
   })
}

function readPosition (data){
    position = data.val();
    paddle.x = position.x;
    paddle.y = position.y;

}

function showError (){
console.log("error");
}
