let pista = document.getElementById('pista');
let pistaWidth = pista.clientWidth;
let pistaHeight = pista.clientHeight;

let porteria = document.querySelector('.porteria');
let score = document.querySelector('#score');
let anguloScore = document.querySelector('#angulo');
let canon = document.querySelector('.canon');

let pelota = document.querySelector('.pelota');
let pelotaWidth = pelota.clientWidth;
let pelotaHeight = pelota.clientHeight;

let xBall = 0;
let yBall = (pista.clientHeight - pelotaHeight) / 2;
// let yBall = 20;
let ballSpeedX = 5;
let ballSpeedY = 5;

let totalGoles = 0;
let anguloDisparo = 0;
let intMoviendo;
let running = false;

// ----------------------------------------------------------------------------

document.addEventListener('keydown', fireHandler);

displayAngulo();


function fireHandler(e) {
    console.log(e.code);

        switch (e.code) {
            case 'Space':
                if (!running) {
                    fireBall();
                }
                break;
            case 'ArrowUp':
                if (anguloDisparo != -50) {
                    anguloDisparo--;
                }
                break;
            case 'ArrowDown':
                if (anguloDisparo != 50) {
                    anguloDisparo++;
                }
                break;
        }

        displayAngulo();
}

function displayAngulo() {
    anguloScore.innerHTML = anguloDisparo;
    canon.style.transform = `rotateZ(${anguloDisparo}deg)`;
}

function fireBall() {
    intMoviendo = setInterval(moverPelota, 20);  

    running = true;

    // leer angulo y calcular ballSpeedY
    // anguloDisparo = 30;
    ballSpeedY = ((anguloDisparo * 100) / 45) * (ballSpeedX / 100);
}

function moverPelota() {

    if ((yBall + ballSpeedY > pistaHeight - pelotaHeight) || (yBall + ballSpeedY < 0)){
        ballSpeedY = -ballSpeedY;
    }

    // comprobar si hay choque
    
    if ((xBall + ballSpeedX > porteria.offsetLeft - pelotaWidth) && (yBall + ballSpeedY > 100) && (yBall + ballSpeedY < 300)) {
        clearInterval(intMoviendo);
        totalGoles++;
        score.innerHTML = totalGoles;
        xBall = 0;
        yBall = (pista.clientHeight - pelotaHeight) / 2;
        running = false;
    } else if (xBall + ballSpeedX > pistaWidth - pelotaWidth) {
        clearInterval(intMoviendo);
        xBall = 0;
        yBall = (pista.clientHeight - pelotaHeight) / 2;
        running = false;
    } else {
        xBall += ballSpeedX;
        yBall += ballSpeedY;
    }

    pelota.style.left = xBall + 'px';
    pelota.style.top = yBall + 'px';
}