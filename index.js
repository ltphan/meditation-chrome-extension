var btn = document.getElementById("btnNotification");
btn.addEventListener("click", showNotification);

function showNotification() {
  chrome.notifications.create("test1", {
    iconUrl: "waking-up.png",
    message: "Hello",
    title: "Test",
    type: "basic"
  })
}