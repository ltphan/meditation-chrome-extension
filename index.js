function createNotification() {    
    chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl: 'waking-up.png',
        title: 'Reminder to meditate',
        message: 'Go to the Waking Up app'
    })
}

const reminderBtn = document.getElementById('reminderBtn')
reminderBtn.addEventListener('click', createNotification)
