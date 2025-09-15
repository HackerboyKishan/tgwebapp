chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log('Received the content in the script:', message);
    if (message.action === "getSessionStorage") {
      const sessionStorageData = JSON.stringify(sessionStorage);
      sendResponse({ data: sessionStorageData });
    }
  });
  
chrome.runtime.onInstalled.addListener(() => {
    console.log('background.js currently running');
});