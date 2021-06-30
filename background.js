const file = "./data.json"

async function getJSON(jsonFile) {
    try {
        const response = await fetch(jsonFile)
        const data = await response.json()
        return data.cryptoAssets
    } catch (e) {
        throw new Error("Retrieving JSON failed", e)
    }
}

function buildURL(param) {
    return `https://api.coinbase.com/v2/prices/${param}/spot`
}

async function getURLS() {
    try {
        const params = await getJSON(file)
        return urls = params.map((val) => {
            return buildURL(val)
        })
    } catch (e) {
        throw new Error("Error building URL", e)
    }
}

async function fetchData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data.data
    } catch (e) {
        throw new Error("Coinbase API failed", e)
    }
}

async function buildListOfPromises(urls) {
    try {
        const promises = []
        for (let i = 0; i < urls.length; i++) {
            promises.push(fetchData(urls[i]))
        }
        return promises
    } catch (e) {
        throw new Error("Something went wrong building list of promises", e)
    }
}

async function fetchCalls() {
    try {
        const urls = await getURLS()
        const promises = await buildListOfPromises(urls)
        const data = await getDataFromListOfPromises(promises)
        return data 
    } catch (e) {
        throw new Error("Failed to retrieve promises from Coinbase API on multiple fetches", e)
    }
    
}

async function getDataFromListOfPromises(promises) {
    try {
        const data = await Promise.allSettled(promises)
        return result = data.map((val) => {
            return val.value
        })
    } catch (e) {
        throw new Error("Failed to retrieve data from list of promises", e)
    }
}

///////////////////////////////////////////////////////////////////////////////

function createObject(data) {
    return { marketPrice: data.amount, currentPrice: 0, base: data.base }
}

function convertDataArratToObjects(data) {
    return data.map((val) => {
        return createObject(val)
    })
}

async function main() {
    try {
        const data = await fetchCalls()
        const objects = convertDataArratToObjects(data)
        return objects 
    } catch (e) {
        throw new Error("Converting data to objects failed", e)
    }
}

///////////////////////////////////////////////////////////////////////////////

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
            console.log("Data",data)
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

fetchCalls()
