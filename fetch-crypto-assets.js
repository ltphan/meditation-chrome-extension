// data comes from json file when fetching different crypto asset params
const file = "./data.json"

async function getJSON(jsonFile) {
    try {
        const response = await fetch(jsonFile)
        const data = await response.json()
        console.log("data", data.cryptoAssets)
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
            return createURL(val)
        })
        return urls
    } catch (e) {
        throw new Error("Error building URL", e)
    }
}

// fetch data from a single url
async function fetchData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log("DATA", data.data)
        return data.data
    } catch (e) {
        throw new Error("Coinbase API failed", e)
    }
}

fetchData("https://api.coinbase.com/v2/prices/DOGE-USD/spot")

// TODO: create fetch function for all urls