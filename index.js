const startBtn = document.getElementById('startBtn')
const timerDisplay = document.getElementById('timerDisplay')
const pauseBtn = document.getElementById('pauseBtn')

const startingMinutes = parseInt(timerDisplay.innerHTML)
let time = startingMinutes*60

function createNotification() {    
    chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl: 'waking-up.png',
        title: 'Reminder to meditate',
        message: 'Go to the Waking Up app'
    })
}

function countDown() {
    if (time <= 0) {
        clearInterval(time=0)
    }

    let minutes = Math.floor(time / 60)
    let seconds  = Math.floor(time % 60)

    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds

    timerDisplay.innerText = `${minutes}:${seconds}`

    time -= 1
}

function startTimer() {
    setInterval(countDown,1000)
}

startBtn.addEventListener('click', startTimer)

const reminderBtn = document.getElementById('reminderBtn')
reminderBtn.addEventListener('click', createNotification)
pauseBtn.addEventListener('click', startTimer)
