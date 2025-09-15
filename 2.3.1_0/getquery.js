(function() {
    var iframe = document.querySelector("iframe");

    if (iframe) {
        try {
            var inputString = decodeURIComponent(iframe.src);
            var fragment = inputString.split('#')[1] || '';
            var dataPart = fragment.split('tgWebAppData=')[1] || '';

            if (!dataPart) {
                var telegramParams = inputString.split('__telegram__initParams=')[1] || '';
                if (telegramParams) {
                    var telegramData = JSON.parse(decodeURIComponent(telegramParams));
                    dataPart = telegramData['tgWebAppData'] || '';
                }
            }

            if (!dataPart) {
                throw new Error("Query_ID data not found😭");
            }

            var parts = dataPart.split('&');
            var params = {};

            parts.forEach(part => {
                var [key, value] = part.split('=');
                if (key && value) {
                    params[key] = value;
                }
            });

            if (Object.keys(params).length === 0) {
                throw new Error("Query_ID data not found😭");
            }

            var outputString = Object.keys(params)
                .filter(key => !key.includes('tgWebApp'))
                .map(key => `${key}=${params[key]}`)
                .join('&');

            if (!outputString) {
                throw new Error("Query_ID data not found😭");
            }

            var textarea = document.createElement('textarea');
            textarea.value = outputString;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);

            console.log('%cCopied Query_ID to Clipboard', 
                'color:#0ba9fe; font-size:13px; padding: 3px 0px 8px; font-family:monospace;');

            chrome.runtime.sendMessage({ queryIdData: outputString });

        } catch (error) {
            chrome.runtime.sendMessage({ queryerror: `${error.message}` });
        }
    } else {
        chrome.runtime.sendMessage({ queryerror: "Query_ID data not found😭" });
    }
})();