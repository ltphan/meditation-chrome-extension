// data comes from json file when fetching different crypto asset params
const file = "../dadsfsdfsta.json"

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

getJSON(file)

// create a url builder with the crypto asset params

// fetch data from a single url

// create fetch function for all urls