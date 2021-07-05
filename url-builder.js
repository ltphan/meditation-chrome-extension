function fetchCryptoParams() {
    return fetch('./data.json').then(response => {
        return response.json().then(data => {
            return data.cryptoAssets
        })
    }).catch(e => {
        console.log(e)
    })
}

function getRandomInt(val) {
	return Math.floor(Math.random()*val)
}

async function randomizeCryptoParams() {
    const arr = await fetchCryptoParams()
    const size = arr.length
    const index = getRandomInt(size)
    return arr[index]
}

async function urlBuilder() {
    const cryptoParam = await randomizeCryptoParams()
    const url = `https://api.coinbase.com/v2/prices/${cryptoParam}/spot`
    return url
}

/////////

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