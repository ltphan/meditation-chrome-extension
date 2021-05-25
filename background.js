// TODO: fetch crypto asset base from Coinbase API
let cryptoAsset = 'BTC'

// TODO: fetch marketPrice from Coinbase API
let marketPrice = 5

let currentPrice = 10
let message = `${currentPrice}% decrease. Immediately go to the meditation app.`
let title = `Uh-oh, ${cryptoAsset} dropped.`

function calculatePercentage() {
   const difference = currentPrice - marketPrice
   const percentage = (difference/marketPrice)*100

   if (percentage < 1) {
    currentPrice = percentage
   }
}

function createNotification() {    
    chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl: 'waking-up.png',
        title: title,
        message: message
    })
}

setInterval(() => { 
    calculatePercentage()
    createNotification()
}, 5000)
