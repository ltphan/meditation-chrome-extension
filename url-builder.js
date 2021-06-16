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
