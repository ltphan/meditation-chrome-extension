let cryptoAssetObject = {}
let marketPrice = 0
let cryptoBase = ''
let currentPrice = 0
let message = ''
let title = ''
let startInterval = 0
let percentage = 0

function setValues(data) {
    currentPrice = marketPrice
    marketPrice = data.data.amount
    // TODO set percentage and do calculate price function
    setMessage("90%")
    setTitle(data.data.base) 
}

function setMessage(str) {
    message = `${str}% decrease. Immediately go to the meditation app.`
}

function setTitle(str) {
    title = `Uh-oh, ${str} dropped.`
}

function assignValues() {
    currentPrice = marketPrice
    cryptoBase = cryptoAssetObject.data.base
    marketPrice = cryptoAssetObject.data.amount
    if (currentPrice) {
        percentage = (currentPrice - marketPrice) / currentPrice * 100;
        if (percentage < 0) {
            percentage = percentage * (-1);
        }
        percentage = percentage.toFixed(8);
    }

    message = `${percentage}% decrease. Immediately go to the meditation app.`
    title = `Uh-oh, ${cryptoBase} dropped.`
}

function fetchCryptoAsset() {
    return fetch("https://api.coinbase.com/v2/prices/BTC-USD/spot").then(function (response) {
        return response.json();
    }).then(function (data) {
        return data
    }).catch(function (err) {
        console.log("Something went wrong", err)
    })
}

chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    if ((msg.from === "pop-up") && (msg.subject === "start")) {
        startInterval = setInterval(async () => {
            const data = await fetchCryptoAsset();
            setValues(data)
            if ((marketPrice > currentPrice) && currentPrice) {
                showNotification();
            }
        }, 10000)
    }

    if ((msg.from === "pop-up") && (msg.subject === "stop")) {
        clearInterval(startInterval)
    }
})

function showNotification() {
    chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl: 'waking-up.png',
        title: title,
        message: message
    });
}

