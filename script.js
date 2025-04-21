class Timer {
    constructor() {
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.timerCircle = document.querySelector('.timer-circle');
        this.timerProgress = document.querySelector('.timer-progress');
        this.bellSound = document.getElementById('bellSound');

        this.totalSeconds = 0;
        this.remainingSeconds = 0;
        this.isRunning = false;
        this.interval = null;

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.toggleTimer());
        this.resetBtn.addEventListener('click', () => this.resetTimer());
        this.timerCircle.addEventListener('click', (e) => this.handleCircleClick(e));
    }

    handleCircleClick(e) {
        if (this.isRunning) return;

        const rect = this.timerCircle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const degrees = (angle * 180 / Math.PI + 360) % 360;
        
        this.totalSeconds = Math.floor(degrees / 360 * 60 * 60); // Convert to seconds
        this.remainingSeconds = this.totalSeconds;
        this.updateDisplay();
        this.updateProgress();
    }

    toggleTimer() {
        if (this.isRunning) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    }

    startTimer() {
        if (this.remainingSeconds === 0) return;
        
        this.isRunning = true;
        this.startBtn.innerHTML = '<i class="fas fa-pause"></i>';
        
        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateDisplay();
            this.updateProgress();
            
            if (this.remainingSeconds === 0) {
                this.completeTimer();
            }
        }, 1000);
    }

    pauseTimer() {
        this.isRunning = false;
        this.startBtn.innerHTML = '<i class="fas fa-play"></i>';
        clearInterval(this.interval);
    }

    resetTimer() {
        this.pauseTimer();
        this.remainingSeconds = this.totalSeconds;
        this.updateDisplay();
        this.updateProgress();
    }

    completeTimer() {
        this.pauseTimer();
        this.bellSound.play();
    }

    updateDisplay() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
        
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }

    updateProgress() {
        const progress = (this.remainingSeconds / this.totalSeconds) * 100;
        this.timerProgress.style.background = `conic-gradient(#4CAF50 ${progress}%, transparent ${progress}%)`;
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Timer();
}); 