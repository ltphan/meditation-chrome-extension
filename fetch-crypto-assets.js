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
        const urls = params.map((val) => {
            return buildURL(val)
        })
        return urls
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

async function buildListOfPromises() {
    try {
        const urls = await getURLS()
        const promises = []
        for (let i = 0; i < urls.length; i++) {
            promises.push(fetchData(urls[i]))
        }

        return promises
    } catch (e) {
        throw new Error("Something went wrong building list of promises", e)
    }
}

async function fetchMultipleCalls() {
    try {
        const promises = await buildListOfPromises()
        const data = await Promise.allSettled(promises)
        const result = data.map((val) => {
            return val.value
        })
        return result
    } catch (e) {
        throw new Error("Failed to return objects from Coinbase API on multiple fetches", e)
    }
    
}
