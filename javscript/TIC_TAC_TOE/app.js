let boxes = document.querySelectorAll(".box");
const resPara = document.querySelector(".result");
let resetBtn = document.querySelector("#reset-btn");

let turn0= true;
let gameOver = false;

let overlay = document.querySelector(".overlay");
let moveCount=0;
let drawPic = document.querySelector(".drawPic");
let winPic = document.querySelector(".winPic");
let playAgain =document.querySelector(".playAgain");

const winningPatterns =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

boxes.forEach((box) => {
    box.addEventListener("click", ()=>{
    
    if(gameOver)return;

    if(box.innerText!== '')return;

    if(turn0){
        box.innerText = "O";
        turn0 =false;
    }
    else{
        box.innerText = "X";
        turn0 = true;
    }
    moveCount++;
    checkWinner();
    });
});

const checkWinner = ()=>{
    for(const pattern of winningPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;


        if(pos1Val != "" && pos2Val != "" && pos3Val != "" ){
            if(pos1Val === pos2Val &&  pos2Val === pos3Val){
                resPara.innerText =`${pos1Val} won`;;
                overlay.classList.remove("hide");
                gameOver=true;
                return;
            }
        }
        
    }

    // draw
    if(moveCount === 9 && !gameOver){
        resPara.innerText="It's a Draw!";
        overlay.classList.remove("hide");
        drawPic.classList.remove("hide");
        winPic.classList.add("hide");
        gameOver=true;
    }
};

function playGame(){
    boxes.forEach((box)=>{
        box.innerText = "";
    });

    turn0=true;
    gameOver=false;
    moveCount=0;
    
    overlay.classList.add("hide");
    drawPic.classList.add("hide");
    winPic.classList.remove("hide");
}

resetBtn.addEventListener("click",playGame);

playAgain.addEventListener("click",playGame);

 