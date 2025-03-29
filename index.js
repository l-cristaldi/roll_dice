async function roll() {
    disableButton();
    let playerOneRoll;
    let playerTwoRoll;

    while (playerOneRoll === playerTwoRoll) {
        playerOneRoll = randomRoll();
        playerTwoRoll = randomRoll();
    }

    const playerOneDiceDots = document.querySelector(".dice.player-1").children;
    const playerTwoDiceDots = document.querySelector(".dice.player-2").children;

    let playerOneTemplate = diceTemplate[playerOneRoll];
    let playerTwoTemplate = diceTemplate[playerTwoRoll];

    await fakeLoading(playerOneDiceDots, playerTwoDiceDots)
    await animateDie(playerOneDiceDots, playerTwoDiceDots, playerOneTemplate, playerTwoTemplate);

    let isPlayerOneWinner = playerOneRoll > playerTwoRoll;
    announceWinner(isPlayerOneWinner);
}

function announceWinner(isPlayerOneWinner) {
    if (isPlayerOneWinner) {
        button.textContent = "Player 1 Wins!";
    } else {
        button.textContent = "Player 2 Wins!";
    }

    button.classList.remove("rolling");
    button.classList.add("winner");
}

function fakeLoading(playerOneDiceDots, playerTwoDiceDots) {
    return new Promise((resolve) => {
        for (let i = 0; i <= 6; i++) {
            setTimeout(() => {
                let playerOneRoll = randomRoll();
                let playerTwoRoll = randomRoll();

                let playerOneTemplate = diceTemplate[playerOneRoll];
                let playerTwoTemplate = diceTemplate[playerTwoRoll];

                for (let j = 0; j <= 8; j++) {
                    if (playerOneTemplate[j] === 0) {
                        playerOneDiceDots[j].innerHTML = "";
                    } else if (playerOneTemplate[j] === 1) {
                        playerOneDiceDots[j].innerHTML = "<div></div>";
                    }

                    if (playerTwoTemplate[j] === 0) {
                        playerTwoDiceDots[j].innerHTML = "";
                    } else if (playerTwoTemplate[j] === 1) {
                        playerTwoDiceDots[j].innerHTML = "<div></div>";
                    }
                }

                if (i === 6) {
                    resolve();
                }
                
            }, i * 400);
        }
    })
}

function animateDie(playerOneDiceDots, playerTwoDiceDots, playerOneTemplate, playerTwoTemplate) {
    return new Promise((resolve) => {
        for (let i = 0; i <= 8; i++) {
            if (playerOneTemplate[i] === 0) {
                playerOneDiceDots[i].innerHTML = "";
            } else if (playerOneTemplate[i] === 1) {
                playerOneDiceDots[i].innerHTML = "<div></div>";
            }
    
            if (playerTwoTemplate[i] === 0) {
                playerTwoDiceDots[i].innerHTML = "";
            } else if (playerTwoTemplate[i] === 1) {
                playerTwoDiceDots[i].innerHTML = "<div></div>";
            }

            if (i === 8) {
                return resolve();
            }
        }
    });
}

function randomRoll() {
    return Math.floor((Math.random() * 6)) + 1;
}

function disableButton() {
    button.removeEventListener("click", animateButtonClick);
    button.removeEventListener("click", roll);

    button.textContent = "Rolling...";
    button.classList.add("rolling");
}

function animateButtonClick() {
    button.classList.toggle("click");

    setTimeout(() => {
        button.classList.toggle("click");
    }, 500);
}

let hasRolled = false;
let hasRolledConfirmation = false;
const button = document.querySelector(".button");
button.addEventListener("click", animateButtonClick);
button.addEventListener("click", roll);

const diceTemplate = {
    1: [0,0,0,
        0,1,0,
        0,0,0],

    2: [0,0,1,
        0,0,0,
        1,0,0],

    3: [0,0,1,
        0,1,0,
        1,0,0],
    
    4: [1,0,1,
        0,0,0,
        1,0,1],

    5: [1,0,1,
        0,1,0,
        1,0,1],

    6: [1,0,1,
        1,0,1,
        1,0,1],
}
