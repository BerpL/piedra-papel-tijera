// aca guardo las 3 opciones del juego en un array
const options = ['piedra', 'papel', 'tijera'];

// variables para contar los puntos
let playerScore = 0;
let computerScore = 0;

// agarro los botones del html
const rockButton = document.getElementById('piedra');
const paperButton = document.getElementById('papel');
const scissorsButton = document.getElementById('tijera');
const resetButton = document.getElementById('reiniciar');

// tambien traigo los elementos donde voy a mostrar los resultados
const resultMessage = document.getElementById('mensaje-resultado');
const playerChoice = document.getElementById('eleccion-jugador');
const computerChoice = document.getElementById('eleccion-computadora');
const playerScoreElement = document.getElementById('puntaje-jugador');
const computerScoreElement = document.getElementById('puntaje-computadora');
const playerHand = document.getElementById('mano-jugador');
const computerHand = document.getElementById('mano-computadora');

// esta funcion hace que la compu elija random
function getComputerChoice() {
    let randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

// funcion para obtener el emoji correspondiente a cada opcion
function getEmoji(choice) {
    const emojis = {
        'piedra': '✊',
        'papel': '✋',
        'tijera': '✌️'
    };
    return emojis[choice];
}

// aca chequeo quien gana segun las reglas del juego
function determineWinner(player, computer) {
    if (player === computer) {
        return 'empate';
    }
    
    // piedra gana a tijera, papel gana a piedra, tijera gana a papel
    if (
        (player === 'piedra' && computer === 'tijera') ||
        (player === 'papel' && computer === 'piedra') ||
        (player === 'tijera' && computer === 'papel')
    ) {
        return 'jugador';
    } else {
        return 'computadora';
    }
}

// actualizo los puntos en pantalla
function updateScore() {
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}

// muestro lo que eligio cada uno y el resultado
function showResult(result, player, computer) {
    playerChoice.textContent = 'Tu eleccion: ' + player.toUpperCase();
    computerChoice.textContent = 'Computadora: ' + computer.toUpperCase();
    
    // saco los colores anteriores
    resultMessage.classList.remove('victoria', 'derrota', 'empate');
    
    // pongo el mensaje y el color segun quien gano
    if (result === 'jugador') {
        resultMessage.textContent = 'Ganaste esta ronda';
        resultMessage.classList.add('victoria');
    } else if (result === 'computadora') {
        resultMessage.textContent = 'Perdiste esta ronda';
        resultMessage.classList.add('derrota');
    } else {
        resultMessage.textContent = 'Empate';
        resultMessage.classList.add('empate');
    }
}

// funcion principal que se ejecuta cada vez que juego
function playGame(userChoice) {
    // deshabilito los botones durante la animacion
    disableButtons();
    
    // reseteo las manos a puño cerrado
    playerHand.querySelector('.emoji-mano').textContent = '✊';
    computerHand.querySelector('.emoji-mano').textContent = '✊';
    
    // agrego la animacion de sacudida
    playerHand.classList.add('shake');
    computerHand.classList.add('shake');
    
    // limpio el mensaje anterior
    resultMessage.textContent = '¡Piedra, Papel o Tijera!';
    resultMessage.classList.remove('victoria', 'derrota', 'empate');
    playerChoice.textContent = '';
    computerChoice.textContent = '';
    
    // obtengo la eleccion de la computadora
    let pcChoice = getComputerChoice();
    
    // despues de la animacion de sacudida, muestro las elecciones
    setTimeout(() => {
        // quito la animacion de sacudida
        playerHand.classList.remove('shake');
        computerHand.classList.remove('shake');
        
        // muestro las elecciones con animacion de reveal
        playerHand.querySelector('.emoji-mano').textContent = getEmoji(userChoice);
        computerHand.querySelector('.emoji-mano').textContent = getEmoji(pcChoice);
        
        playerHand.classList.add('reveal');
        computerHand.classList.add('reveal');
        
        // calculo el resultado
        let result = determineWinner(userChoice, pcChoice);
        
        // sumo punto al que gano
        if (result === 'jugador') {
            playerScore++;
        } else if (result === 'computadora') {
            computerScore++;
        }
        
        updateScore();
        showResult(result, userChoice, pcChoice);
        
        // quito la animacion de reveal y habilito los botones
        setTimeout(() => {
            playerHand.classList.remove('reveal');
            computerHand.classList.remove('reveal');
            enableButtons();
        }, 500);
        
    }, 1800); // 3 sacudidas de 0.6s = 1.8s
}

// reseteo todo para empezar de nuevo
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    updateScore();
    
    resultMessage.textContent = 'Elige tu opcion';
    resultMessage.classList.remove('victoria', 'derrota', 'empate');
    playerChoice.textContent = '';
    computerChoice.textContent = '';
    
    // reseteo las manos
    playerHand.querySelector('.emoji-mano').textContent = '✊';
    computerHand.querySelector('.emoji-mano').textContent = '✊';
}

// funciones para habilitar/deshabilitar botones
function disableButtons() {
    rockButton.disabled = true;
    paperButton.disabled = true;
    scissorsButton.disabled = true;
    rockButton.style.opacity = '0.5';
    paperButton.style.opacity = '0.5';
    scissorsButton.style.opacity = '0.5';
    rockButton.style.cursor = 'not-allowed';
    paperButton.style.cursor = 'not-allowed';
    scissorsButton.style.cursor = 'not-allowed';
}

function enableButtons() {
    rockButton.disabled = false;
    paperButton.disabled = false;
    scissorsButton.disabled = false;
    rockButton.style.opacity = '1';
    paperButton.style.opacity = '1';
    scissorsButton.style.opacity = '1';
    rockButton.style.cursor = 'pointer';
    paperButton.style.cursor = 'pointer';
    scissorsButton.style.cursor = 'pointer';
}

// eventos para cuando le dan click a los botones
rockButton.addEventListener('click', function() {
    playGame('piedra');
});

paperButton.addEventListener('click', function() {
    playGame('papel');
});

scissorsButton.addEventListener('click', function() {
    playGame('tijera');
});

resetButton.addEventListener('click', resetGame);
