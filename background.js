
let cryptoAssetObject = {}
let marketPrice = 0
let cryptoBase = ''
let currentPrice = 0
let message = ''
let title = ''

function calculatePercentage() {
    const difference = currentPrice - marketPrice
    const result = Math.floor((difference/marketPrice))
 
    if (result < 1) {
     currentPrice = result*100
    }
 }

function assignValues() {
    cryptoBase = cryptoAssetObject.data.base
    marketPrice = cryptoAssetObject.data.amount
    message = `${currentPrice}% decrease. Immediately go to the meditation app.`
    title = `Uh-oh, ${cryptoBase} dropped.`
}

function fetchCryptoAsset() {
    fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot').then(function (response) {
    return response.json();
    }).then(function (data) {
        cryptoAssetObject = data
        calculatePercentage()
        assignValues()
    }).catch(function (err) {
    console.log("Something went wrong", err)
    }) 
}

// setInterval(() => {
//     fetchCryptoAsset()
//     console.log("message", message)
//     console.log("title", title)
// }, 1000)
