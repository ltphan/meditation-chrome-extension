var btn = document.getElementById("btnSetReminder");
btn.addEventListener("click", setReminder);
var result = document.getElementById("result");

chrome.runtime.sendMessage("", {data: "get-status"}, (response) => {
  if(response && response.result === true) {
    btn.setAttribute("disabled", "disabled");
    result.innerText = "Alarm is already set.";
  }
})

function setReminder() {
  btn.setAttribute("disabled", "disabled");
  chrome.runtime.sendMessage("", {data: "set-reminder"}, (response) => {
    if(response && response.result === true) {
      result.innerText = "Alarm set successfully";
    } else {
      btn.removeAttribute("disabled");
      result.innerText = "Something went wrong, please contact our support team.";
    }
  });
}