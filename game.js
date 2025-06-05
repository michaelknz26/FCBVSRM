let player1 = { name: "Messi", hp: 100, energy: 0 };
let player2 = { name: "Ronaldo", hp: 100, energy: 0 };
let log = document.getElementById("log");

function updateDisplay() {
    document.getElementById("player1").innerText = player1.name + " (" + player1.hp + " PV)";
    document.getElementById("player2").innerText = player2.name + " (" + player2.hp + " PV)";
}

function attack(type) {
    let dmg = 0;
    switch(type) {
        case "punch":
            dmg = 10;
            player1.energy += 5;
            log.innerText = player1.name + " donne un coup de poing !";
            break;
        case "kick":
            dmg = 15;
            player1.energy += 10;
            log.innerText = player1.name + " donne un coup de pied !";
            break;
        case "combo":
            dmg = 25;
            player1.energy += 15;
            log.innerText = player1.name + " enchaîne un combo !";
            break;
        case "special":
            if (player1.energy >= 50) {
                dmg = 40;
                player1.energy = 0;
                log.innerText = player1.name + " déclenche son coup spécial : La Pulga Shot !";
            } else {
                log.innerText = "Pas assez d'énergie pour le coup spécial !";
                return;
            }
            break;
    }

    player2.hp -= dmg;
    if (player2.hp < 0) player2.hp = 0;

    updateDisplay();

    if (player2.hp <= 0) {
        log.innerText += "\nVictoire de " + player1.name + " !";
        disableButtons();
    } else {
        setTimeout(cpuTurn, 1000);
    }
}

function cpuTurn() {
    let moves = ["punch", "kick", "combo"];
    let move = moves[Math.floor(Math.random() * moves.length)];
    let dmg = move === "punch" ? 10 : move === "kick" ? 15 : 25;
    player2.energy += 10;
    log.innerText = player2.name + " répond avec un " + move + " !";
    player1.hp -= dmg;
    if (player1.hp < 0) player1.hp = 0;
    updateDisplay();

    if (player1.hp <= 0) {
        log.innerText += "\nVictoire de " + player2.name + " !";
        disableButtons();
    }
}

function disableButtons() {
    document.querySelectorAll("button").forEach(btn => btn.disabled = true);
}

updateDisplay();