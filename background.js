var alarmIsSet = false;

// setInterval(function() {
//   timeToShowPopup = true;
//   chrome.notifications.create("test1", {
//     iconUrl: chrome.runtime.getURL('waking-up.png'),
//     message: "Hello",
//     title: "Test",
//     type: "basic",
//     priority: 2,
//   })
// }, 5000);

function setReminder() {
  setTimeout(() => {
    chrome.notifications.create("alarm", {
      iconUrl: chrome.runtime.getURL('waking-up.png'),
      message: "Time to meditate!",
      title: "Meditation time!",
      type: "basic",
      priority: 2,
    });
    alarmIsSet = false;
  }, 60000);
  alarmIsSet = true;
  return alarmIsSet;
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  let result = false;
  if(message) {
    switch(message.data) {
      case"set-reminder":
        result = setReminder();
        break;
      case "get-status":
        result = alarmIsSet;
        break;
    }
  }
  sendResponse({result});
})