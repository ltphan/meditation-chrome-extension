const videos = {
    0: "https://www.youtube.com/embed/tw7XBKhZJh4",
    1: "https://www.youtube.com/embed/CN-_zzHpcdM",
    3: "https://www.youtube.com/embed/pbU_NzZiEAI",
    4: "https://www.youtube.com/embed/jZXgrhXJw9o",
    5: "https://www.youtube.com/embed/XoUBqZZgUEI",

}
const video = document.getElementById("youtubeVideo")

function getLengthOfObject(obj) {
	return Object.keys(obj).length
}

function getRandomInt(val) {
	return Math.floor(Math.random()*val)
}

function getVideoURL(obj) {
	const size = getLengthOfObject(obj)
	const id = getRandomInt(size)
    return obj[id]
}

function randomizeVideos(obj) {
    const videoUrl = getVideoURL(obj)
    const attr = video.getAttribute("src")
    console.log(attr)
    video.setAttribute("src", videoUrl)
    // console.log(video.getAttribute("src"))
}

window.addEventListener('load', (event) => {
    console.log(event)
    console.log()
    randomizeVideos(videos)
})