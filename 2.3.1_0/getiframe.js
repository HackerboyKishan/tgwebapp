(function() {
    var iframes = document.querySelectorAll("iframe");

    if (iframes.length > 0) {
        var iframeSrcs = [];
        iframes.forEach(iframe => {
            try {
                var srcValue = iframe.getAttribute('src');
                if (!srcValue) {
                    iframeSrcs.push("No Iframe value😭");
                } else {
                    iframeSrcs.push(srcValue);
                }
            } catch (e) {
                console.error("Iframe content cannot be accessed😭", e);
                iframeSrcs.push("Content cannot be accessed");
            }
        });

        if (iframeSrcs.length === 0) {
            chrome.runtime.sendMessage({
                iframeerror: "Unable to get Iframe value😭"
            });
        } else {
            var textArea = document.createElement('textarea');
            textArea.value = iframeSrcs.join('\n');
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);

            console.log('%cIframe Src has been copied to the Clipboard',
                'color:#0ba9fe; font-size:13px; padding: 3px 0px 8px; font-family:monospace;');
            chrome.runtime.sendMessage({
                iframeSrcs: iframeSrcs
            });
        }
    } else {
        chrome.runtime.sendMessage({
            iframeerror: "iframe element not found😭"
        });
    }
})();