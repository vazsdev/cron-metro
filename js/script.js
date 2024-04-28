
let timer;
let startTime;
let remainingTime = 0;
let isPaused = true;
let animationId;

function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    // Removendo a parte dos milissegundos
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toFixed(1).toString().padStart(2, '0')}`;
}

function startTimer() {
    startTime = Date.now();
    animationId = requestAnimationFrame(step);

    function step(timeStamp) {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const totalTime = remainingTime + elapsedTime;
        const timeInSeconds = totalTime / 1000;
        document.querySelector('.timer').textContent = formatTime(timeInSeconds);
        animationId = requestAnimationFrame(step);
    }

    document.getElementById('startBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;
    document.getElementById('resumeBtn').disabled = true;
    document.getElementById('resetBtn').disabled = false;
    isPaused = false; // Definindo isPaused como false ao iniciar o temporizador
}


function pauseTimer() {
    cancelAnimationFrame(animationId); // Para a animação
    remainingTime += Date.now() - startTime;
    document.getElementById('startBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('resumeBtn').disabled = false;
    document.getElementById('resetBtn').disabled = false;
    isPaused = true;
}

function resumeTimer() {
    if (!isPaused) return;
    startTimer();
}

function resetTimer() {
    cancelAnimationFrame(animationId); // Para a animação
    remainingTime = 0;
    document.querySelector('.timer').textContent = '00:00:00';
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('resumeBtn').disabled = true;
    document.getElementById('resetBtn').disabled = true;
    isPaused = true;
}


document.getElementById('resetBtn').addEventListener('click', resetTimer);
document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resumeBtn').addEventListener('click', resumeTimer);