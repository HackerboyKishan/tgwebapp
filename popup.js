document.getElementById('query_id').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['getquery.js']
        });
    });
});

document.getElementById('user=').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['getuser.js']
        });
    });
});

document.getElementById('iframe_src').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['getiframe.js']
        });
    });
});

// Handle Donate Button
document.getElementById('donateButton').addEventListener('click', () => {
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('donation-page').style.display = 'block';
});

// Handle Back Button
document.getElementById('backButton').addEventListener('click', () => {
    document.getElementById('main-container').style.display = 'block';
    document.getElementById('donation-page').style.display = 'none';
});

// Handle Copy Buttons
const copyButtons = document.querySelectorAll('.copy-button');
copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const addressId = button.getAttribute('data-address');
        const addressText = document.getElementById(addressId).textContent;

        // Copy to clipboard
        navigator.clipboard.writeText(addressText).then(() => {
            alert('Address copied to clipboard!');
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    var requestToken = document.getElementById('requestToken');
    var requestQuery = document.getElementById('requestQuery');
    var requestUser = document.getElementById('requestUser');
    var requestIframe = document.getElementById('requestIframe');

    requestToken.innerHTML = '';
    requestQuery.innerHTML = '';
    requestUser.innerHTML = '';
    requestIframe.innerHTML = '';

    if (message.queryIdData) {
        requestQuery.innerHTML = `<b><span style="color: #00ab00; font-size: 14px;">😍Retrieve Query_ID data successfully</span></b>`;
    } else if (message.userData) {
        requestUser.innerHTML = `<b><span style="color: #00ab00; font-size: 14px;">😍Retrieve format User=%7B%22... successfully</span></b>`;
    } else if (message.iframeSrcs) {
        requestIframe.innerHTML = `<b><span style="color: #00ab00; font-size: 14px;">😍Get the Iframe Source element successfully</span></b>`;
    }  else if (message.queryerror) {
        requestQuery.innerHTML = `<b><span style="color: red; font-size: 14px;">${message.queryerror}</span></b>`;
    } else if (message.usererror) {
        requestUser.innerHTML = `<b><span style="color: red; font-size: 14px;">${message.usererror}</span></b>`;
    } else if (message.iframeerror) {
        requestIframe.innerHTML = `<b><span style="color: red; font-size: 14px;">${message.iframeerror}</span></b>`;
    }
});