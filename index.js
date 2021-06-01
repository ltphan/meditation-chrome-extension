const startBtn = document.getElementById('startBtn')
const timerDisplay = document.getElementById('timerDisplay')
const pauseBtn = document.getElementById('pauseBtn')
const resetBtn = document.getElementById('resetBtn')
const reminderBtn = document.getElementById('reminderBtn')
const remindText = document.getElementById('remindText')

const startingMinutes = parseInt(timerDisplay.innerHTML)
let time = startingMinutes*60
let minutes = Math.floor(time / 60)
let seconds  = Math.floor(time % 60)
let interval = -1
let reminderOff = false

function turnNotificationsOn() {
    if (reminderOff) {
        remindText.innerHTML = "Notifications Off"
        chrome.runtime.sendMessage({from: 'pop-up', subject: 'stop'})
    } else {
        remindText.innerHTML = "Notifications On"
        chrome.runtime.sendMessage({from: 'pop-up', subject: 'start'})
    }

    reminderOff = !reminderOff
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
    interval = setInterval(countDown,1000)
}

function pauseTimer() {
    clearInterval(interval)
    interval = -1
}

function resetTimer() {
    clearInterval(time=startingMinutes*60)
    clearInterval(interval)
    timerDisplay.innerText = "10:00"
    interval = -1   
}

startBtn.addEventListener('click', startTimer)
reminderBtn.addEventListener('click', turnNotificationsOn)
pauseBtn.addEventListener('click', pauseTimer)
resetBtn.addEventListener('click', resetTimer)
