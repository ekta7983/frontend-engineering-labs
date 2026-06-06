const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;

let snake = [{x:200,y:200}];
let food = createFood();

let gameOver = false;
let score = 0;

let direction = 'right';

const restartBtn = document.getElementById('restart-btn');

function drawSnake(){
    snake.forEach(part => {
        ctx.fillStyle = '#3ac610';
        ctx.fillRect(part.x,part.y,gridSize,gridSize);
    })
}

function moveSnake(){
    let head = snake[0];

    let newHead = {
        x : head.x,
        y : head.y
    }

    if (direction === 'right'){
        newHead.x +=gridSize;
    }
    else if(direction === 'left'){
        newHead.x -= gridSize;
    }
    else if(direction === 'up'){
        newHead.y -= gridSize;
    }else{
        newHead.y += gridSize; 
    }

    // handles snake out of the canvas case
    if (newHead.x >= canvas.width) {
        newHead.x = 0;
    }

    if (newHead.x < 0) {
        newHead.x = canvas.width - gridSize;
    }

    if (newHead.y >= canvas.height) {
        newHead.y = 0;
    }

    if (newHead.y < 0) {
        newHead.y = canvas.height - gridSize;
    }

    snake.unshift(newHead);
    if(newHead.x === food.x && newHead.y === food.y){
        food = createFood()
        score += 10;
    }else{
        snake.pop();
    }

}

function drawFood(){
    ctx.fillStyle = '#6a49cc';
    ctx.fillRect(food.x,food.y,gridSize,gridSize);
}


function createFood(){
    const foodX  =  Math.floor(Math.random()*(canvas.width/gridSize))*gridSize;
    const foodY  =  Math.floor(Math.random()*(canvas.height/gridSize))*gridSize;

    return {x:foodX,y:foodY};
}

function changeDirection(event){
    const keyPressed = event.key;
    if(keyPressed == 'ArrowUp' && direction !== 'down'){
        direction = 'up';
    }
    else if(keyPressed == 'ArrowDown' && direction !== 'up'){
        direction = 'down';
    }
    else if(keyPressed == 'ArrowLeft' && direction !== 'right'){
        direction = 'left';
    }
    else if(keyPressed == 'ArrowRight' && direction !== 'left'){
        direction = 'right';
    }

}

function checkCollision(){
    let snakeHead = snake[0];
    for(let i=1;i<snake.length;i++){
        if(snakeHead.x === snake[i].x && snakeHead.y === snake[i].y){
            gameOver = true;
            clearInterval(gameLoop);
            showGameOverCard();
        }
    }
}

function showGameOverCard(){
    const card = document.getElementById('gameOverCard');
    const finalScore = document.getElementById('finalScore');
    finalScore.textContent = `Your Score: ${score}`;
    card.classList.remove('hidden');
    
}

restartBtn.addEventListener('click',()=>{
    snake = [{x:200,y:200}];
    direction = 'right';
    score = 0;
    gameOver = false;
    food = createFood();
    document.getElementById('gameOverCard').classList.add('hidden');
    setInterval(draw,200);
});

document.addEventListener('keydown', changeDirection);

function draw(){
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
    moveSnake();
    drawSnake();
    drawFood();
    checkCollision();
}

const gameLoop = setInterval(draw,200);



