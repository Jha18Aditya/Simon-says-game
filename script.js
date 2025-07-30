
let gameSeq = [];
let userSeq = [];
let btns = ["green", "orange", "skyblue", "pink"];
let started = false;
let level = 0;
let highestscore = 0;
let score = 0;
let h2 = document.querySelector("h2");
let startBtn = document.querySelector(".start-btn");

function startGame() {
    if (!started) {
        started = true;
        document.getElementById('bgMusic').play();
        startBtn.style.display = "none";
        levelup();
    }
}

// Start game on button click
startBtn.addEventListener("click", startGame);

// Also allow starting with keypress
document.addEventListener("keypress", startGame);


function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 400);
}

function userflash(btn) {
    btn.classList.add("uflash");
    setTimeout(() => btn.classList.remove("uflash"), 400);
}


function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `🔥 Level ${level} — You're Crushing It!`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let color = btns[randIdx];
    let btn = document.querySelector(`.${color}`);

    gameSeq.push(color);
    gameflash(btn);
}

function finalresult(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            score++;
            setTimeout(levelup, 1000);
        }
    } else {
        if (score > highestscore) {
            highestscore = score;
        }


        h2.innerHTML = `Oops! You missed that color! <b>Your score was ${score}</b><br>Ready? Tap any key to begin your color quest...`;
        let oldScore = document.querySelector(".hscore");
        if (oldScore) oldScore.remove();

        let hscore = document.createElement("h2");
        hscore.classList.add("hscore");
        hscore.innerHTML = `Highest score was : ${highestscore}`;
        h2.insertAdjacentElement("afterend", hscore);

        document.body.style.backgroundColor = "red";
        document.getElementById('bgMusic').pause();
        document.getElementById('bgMusic').currentTime = 0;
        document.getElementById('gameOverSound').play();
        
        // Show and update restart button
        startBtn.textContent = "Restart Game";
        startBtn.style.display = "block";
        
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 150);

        reset();
    }
}


function btnpress() {
    let btn = this;
    userflash(btn);
    let color = btn.getAttribute("id");
    userSeq.push(color);
    finalresult(userSeq.length - 1);
}


let allbtns = document.querySelectorAll(".btns");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}


function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    score=0;
}
