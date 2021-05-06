// setInterval(function () {
//   console.log("I'm a content script and I'm about to check the background script to see if it's time to show a popup.");
//   chrome.runtime.sendMessage({ data: "isItTimeToShowPopup?" }, (response, notifications) => {
//     var n = notifications;
//     console.log("I'm a content script and I received the response from the backgournd page.");
//     console.log("the response was:", response);
//     if (response === true) {
//       setTimeout(function () {
//         n.create("test1", {
//           iconUrl: "waking-up.png",
//           message: "Hello",
//           title: "Test",
//           type: "basic"
//         })
//       }, 0)
//     }
//   })
// }, 1000)

console.log("hello")