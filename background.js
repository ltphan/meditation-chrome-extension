var timeToShowPopup = false;

setInterval(function() {
  // timeToShowPopup = true;
  chrome.notifications.create("test1", {
    iconUrl: "waking-up.png",
    message: "Hello",
    title: "Test",
    type: "basic"
  })
}, 5000);

// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//   if(message && message.data === "isItTimeToShowPopup?") {
//     sendResponse(timeToShowPopup);
//     if(timeToShowPopup === true) {
//       timeToShowPopup = false;
//     }
//   }
// })