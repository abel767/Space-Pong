const gameBoard = document.querySelector('.gameBoard');
const context = gameBoard.getContext("2d");
const scoreText = document.querySelector('.scoreText');
const resetBtn = document.querySelector('.reset-btn');

const boardBackground = "black"
// game width measured to gameboard width
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
// the two paddle(Player) color
const player1Color = "red";
const player2Color = "blue";
// paddle border color
const playerBorder = 'white';
// ball properties
const ballColor = "#701198"
const ballBorderColor = 'black';
const ballRadius = 12.5;
let playerSpeed = 50;
let IntervalId;
let ballSpeed = 1;
let ballX = gameWidth / 2; // center of the game board
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
// player score 
let player1Score = 0;
let player2Score = 0;
// paddle design (player 1)
let player1 = {
    width: 25,
    height: 100,
    x: 2,
    y: 2
}
let player2 = {
    width: 25,
    height: 100,
    x: gameWidth - 29,
    y: gameHeight -  150
}

// event listeners

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener('click', resetGame )

gameStart();
drawPlayer();

function gameStart (){
    createBall();
    nextTick();
};

function nextTick(){
    IntervalId = setTimeout(()=>{
         clearBoard();
         drawPlayer();
         moveball();
         drawBall(ballX, ballY);
         checkCollision();
         nextTick();
    },10)
};

function clearBoard(){
    context.fillStyle = boardBackground;
    context.fillRect(0,0, gameWidth, gameHeight)
};

function drawPlayer(){
    // player 1
    context.strokeStyle = playerBorder;
    context.fillStyle = player1Color;
    context.fillRect(player1.x, player1.y, player1.width, player1.height);
    context.strokeRect(player1.x, player1.y, player1.width, player1.height);
    // player 2
    context.fillStyle = player2Color;
    context.fillRect(player2.x, player2.y, player2.width, player2.height);
    context.strokeRect(player2.x, player2.y, player2.width, player2.height);

};

function createBall(){
    ballSpeed = 1;
    if(Math.round(Math.random()) == 1){
        ballXDirection = 1;
    }else{
        ballXDirection = -1;
    }
    if(Math.round(Math.random()) == 1){
        ballYDirection = 1;
    }else{
        ballYDirection = -1;
    }
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    drawBall(ballX,ballY);
};

function drawBall(ballX, ballY){
    context.fillStyle = ballColor;
    context.strokeStyle = ballBorderColor;
    context.lineWidth = 2;
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    context.stroke()
    context.fill();
};

function moveball(){
    ballX += (ballSpeed * ballXDirection);
    ballY += (ballSpeed * ballYDirection);

    if(ballSpeed > 5){
        ballSpeed = 5;
    }
};

function checkCollision(){
    if(ballY <=0 + ballRadius){
        ballYDirection *= -1
    } if(ballY >= gameHeight - ballRadius){
        ballYDirection *= -1
    } if(ballX <= 0){
        player2Score +=1;
        updateScore();
        createBall();
        return;
    }if(ballX >= gameWidth){
        player1Score +=1;
        updateScore();
        createBall();
        return;
    }
    if(ballX <=(player1.x + player1.width + ballRadius)){
        if(ballY > player1.y && ballY < player1.y + player1.height){
            ballX = (player1.x + player1.width + ballRadius); // if ball get stuck
            ballXDirection *= -1;
            ballSpeed += 1;
        }
    }
    if(ballX >=(player2.x - ballRadius)){
        if(ballY > player2.y && ballY < player2.y + player2.height){
            ballX = (player2.x - ballRadius); // if ball get stuck
            ballXDirection *= -1;
            ballSpeed += 1;
        }
    }
};

function changeDirection(event){
    const keyPressed = event.key;
    console.log(keyPressed);
    const player1Up = "w";
    const player1Down = "s";
    const player2Up = 'ArrowUp';
    const player2Down = "ArrowDown";

    switch(keyPressed){
         case(player1Up): 
         if(player1.y > 2){
            player1.y -= playerSpeed;
         }
        break;
         case(player1Down): 
         if(player1.y < gameHeight - player1.height){
            player1.y += playerSpeed;
         }
         break;
         case(player2Up): 
         if(player2.y > 0){
            player2.y -= playerSpeed;
         }
        break;
         case(player2Down): 
         if(player2.y < gameHeight - player2.height){
            player2.y += playerSpeed;
         }
         break;
    }
};

function updateScore(){
    scoreText.textContent = `${player1Score} : ${player2Score} `
};
function resetGame(){
    player1Score =0;
    player2Score = 0;
     player1 = {
        width: 25,
        height: 100,
        x: 2,
        y: 2
    }
     player2 = {
        width: 25,
        height: 100,
        x: gameWidth - 29,
        y: gameHeight -  150
    }
    ballSpeed = 1;
    ballX = 0;
    ballY = 0;
    ballXDirection =0;
    ballYDirection = 0;
    updateScore();
    clearInterval(IntervalId);
    gameStart();

};


