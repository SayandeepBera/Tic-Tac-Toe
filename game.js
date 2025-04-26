let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");

let newGameBtn=document.querySelector("#newGame-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turn0=true; // PlayerX , Player0
let count=0; // to track the draw

// win pattern
const winPattern=[
                    [0,1,2],
                    [0,3,6],
                    [0,4,8],
                    [1,4,7],
                    [2,5,8],
                    [2,4,6],
                    [3,4,5],
                    [6,7,8]
                ];

// color change the text
const colorChange=(turn0,box)=>{
    box.style.color=turn0 ? "#b0413e" : "#7A1CAC";
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn0){
            box.innerText="0";
            turn0=false;
        }else{
            box.innerText="X";
            turn0=true;
        }

        colorChange(turn0,box);
        
        box.disabled=true;
        count++;

        let isWinner=checkWinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }
        
    });
});

// disabled box
const disabledBox=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

// enabled box
const enabledBox=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

// reset game
const resetGame=()=>{
    turn0 = true;
    count=0;
    enabledBox();
    msgContainer.classList.add("hide");
};

// show winner
const showWinner=(winner)=>{
    msg.innerText=`Congratulation, Winner is Player ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBox();
};

// game draw
const gameDraw=()=>{
    msg.innerText=`Game was a Draw`;
    msgContainer.classList.remove("hide");
    disabledBox();
};

// check winner
const checkWinner=()=>{
    for(let pattern of winPattern){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
        
        if(pos1Val !== "" && pos2Val !== "" && pos3Val !== ""){

            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);