console.log("content script")

function createNotification() {    
    chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl: 'waking-up.png',
        title: title,
        message: message
    })
}
