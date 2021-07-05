let marketPrice = 0
let currentPrice = 0
let message = ''
let title = ''
let startInterval = 0

function setValues(data) {
    currentPrice = marketPrice
    marketPrice = data.data.amount
    const percentage = calculatePercentage(currentPrice,marketPrice)
    setMessage(percentage)
    setTitle(data.data.base) 
}

function setMessage(str) {
    message = `${str}% decrease. Immediately go to the meditation app.`
}

function setTitle(str) {
    title = `Uh-oh, ${str} dropped.`
}

function calculatePercentage(currPrice,marketPrice) {
    let percentage = 0
    if (currPrice) {
        percentage = (currPrice - marketPrice) / currPrice * 100;
        if (percentage < 0) {
            percentage = percentage * (-1);
        }
        percentage = percentage.toFixed(8);
        return percentage
    } 
}

async function fetchCryptoAsset() {
    try {
        const response = await fetch("https://api.coinbase.com/v2/prices/BTC-USD/spot")
        const data = await response.json()
        return data
    } catch (e) {
        throw Error("Coinbase API failed", e)
    }
}

chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    if ((msg.from === "pop-up") && (msg.subject === "start")) {
        startInterval = setInterval(async () => {
            const data = await fetchCryptoAsset();
            setValues(data)
            if ((marketPrice > currentPrice) && currentPrice) {
                console.log("hit show notification")
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

