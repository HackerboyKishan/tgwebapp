function TokenButtonClick() {
  let DataToken = "";
  let ReceivedToken = "";
  let TokenViewer = "";

  chrome.runtime.sendMessage({ action: "getTokenFromLocalStorage" }, (response) => {
    if (response) {
      if (response.accessToken) {
        DataToken += `<span style="color: red; font-size: 15px;">accessToken:</span> <span style="color: #00ab00;">${response.accessToken}</span><br>`;
        TokenViewer = response.accessToken;
      }
      for (const [key, value] of Object.entries(response)) {
        if (key !== "accessToken") {
          DataToken += `<span style="color: red; font-size: 15px;">${key}:</span> <span style="color: #00ab00;">${value}</span><br>`;
          TokenViewer = value;
        }
      }
    }
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.runtime.sendMessage({ action: "getRecordedRequests" }, (response) => {
        if (response && response.length) {
          response.forEach((request) => {
            ReceivedToken += `<span style="color: red; font-size: 15px;">URL:</span> <span style="color: blue;">${request.topLevelUrl}</span> - <span style="color: red; font-size: 15px;">Auth:</span> <span style="color: #00ab00;">${request.authorization}</span><br>`;
            if (request.authorization.startsWith("Bearer ")) {
              TokenViewer = request.authorization.substring(7);
            } else {
              TokenViewer = request.authorization;
            }
          });
        }

        const requestToken = document.getElementById("requestToken");
        if (requestToken) requestToken.innerHTML = '';
        if (requestQuery) requestQuery.innerHTML = '';
        if (requestUser) requestUser.innerHTML = '';
        if (requestIframe) requestIframe.innerHTML = '';
        if (requestToken) {
          if (ReceivedToken) {
            requestToken.innerHTML = ReceivedToken;
          } else if (DataToken) {
            requestToken.innerHTML = DataToken;
          } else {
            requestToken.innerHTML = '<b><span style="color: red; font-size: 14px;">Không có mã Token nào được tìm thấy😭</span></b>';
          }
        }

        if (TokenViewer) {
          navigator.clipboard.writeText(TokenViewer).then(() => {
            console.log("The token has been copied to the Clipboard");
          }).catch((err) => {
            console.error("Error when copying Token to Clipboard: ", err);
          });
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('getAuth').addEventListener('click', TokenButtonClick);
});