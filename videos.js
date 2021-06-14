const video = document.getElementById("youtubeVideo")

// retrieve json file
function fetchVideoData() {
    return fetch('./data.json').then((response) => {
        return response.json()
    }).then(data => {
        return data.data
    }).catch(e => {
        console.log("error", e)
    })
}

function getRandomInt(val) {
	return Math.floor(Math.random()*val)
}

async function getVideoURL() {
    const data = await fetchVideoData()
    const len = data.length
    const index = getRandomInt(len)
    return data[index]
}

async function randomizeVideos() {
    const videoUrl = await getVideoURL()
    console.log("vid url",videoUrl)
    video.setAttribute("src", videoUrl)
}

window.addEventListener('load', (event) => {
    randomizeVideos()
})