const popUpBtn = document.getElementById("popUpBtn")

function openHomePage() {
    chrome.tabs.create({url: "index.html"})
}

popUpBtn.addEventListener("click", openHomePage)