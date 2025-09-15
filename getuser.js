(function() {
    var iframe = document.querySelector("iframe");

    if (iframe) {
        var inputString = decodeURIComponent(iframe.src);
        var fragment = inputString.split('#')[1] || '';
        var dataPart = fragment.split('tgWebAppData=')[1] || '';

        if (dataPart.length > 0) {
            var userPart = dataPart.split('user=')[1];
            if (userPart) {
                var params = userPart.split('&');
                var excludeKeys = ['tgWebAppVersion', 'tgWebAppPlatform', 'tgWebAppThemeParams'];
                var filteredParams = params.filter(param => {
                    var [key] = param.split('=');
                    return !excludeKeys.includes(key);
                });
                
                var result = 'user=' + filteredParams.join('&');
                var textarea = document.createElement('textarea');
                textarea.value = result;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                
                console.log('%cUser data copied to Clipboard', 
                    'color:#0ba9fe; font-size:13px; padding: 3px 0px 8px; font-family:monospace;');

                chrome.runtime.sendMessage({userData: result});
            } else {
                chrome.runtime.sendMessage({usererror: "No data found user=%7B%22...😭"});
            }
        } else {
            chrome.runtime.sendMessage({usererror: "No data found user=%7B%22...😭"});
        }
    } else {
        chrome.runtime.sendMessage({usererror: "No data found user=%7B%22...😭"});
    }
})();