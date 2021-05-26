
let cryptoAssetObject = {}
let marketPrice = 0
let cryptoBase = ''
let currentPrice = 0
let message = `${currentPrice}% decrease. Immediately go to the meditation app.`
let title = `Uh-oh, ${cryptoBase} dropped.`

function fetchCryptoAsset() {
    fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot').then(function (response) {
    return response.json();
    }).then(function (data) {
        cryptoAssetObject = data
    }).catch(function (err) {
    console.log("Something went wrong", err)
    }) 
}

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


function assignValues() {
    cryptoBase = cryptoAssetObject.data.base
    marketPrice = cryptoAssetObject.data.amount
}

// setInterval(() => { 
//     calculatePercentage()
//     createNotification()
// }, 5000)

setInterval(() => {
    fetchCryptoAsset()
    assignValues()
}, 5000)

