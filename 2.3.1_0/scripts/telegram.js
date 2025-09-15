(function() {
    function DOMChanges() {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                var addedNodes = mutation.addedNodes;
                if (addedNodes && addedNodes.length > 0) {
                    updateIframeSrc();
                }
            });
        });
        observer.observe(document.querySelector('body'), { childList: true, subtree: true });
    }

    function updateIframeSrc() {
        const excludeDomains = [
            "cats", "dev.goatsbot.xyz", "testnet-faucet.duckchain.io",
            "miniapp.meshchain.ai", "tonclayton.fun", "thevertus.app", "frog-house-mini-app.vercel.app"
        ];

        document.querySelectorAll('iframe').forEach(iframe => {
            let src = iframe.getAttribute('src');
            if (src && src.includes('tgWebAppPlatform=web') && !excludeDomains.some(domain => src.includes(domain))) 
            {
                iframe.setAttribute('src', src.replace(/tgWebAppPlatform=web[a-z]?/, 'tgWebAppPlatform=ios'));
            }
        });
    }

    console.log('%cByPass Telegram Web - BrewVN\n%cKHÔNG BÁN - SỬ DỤNG MIỄN PHÍ\n%cTelegram: https://t.me/brewvn_ltd', 
            'color:#00df36; font-weight:bold; font-size:15px; padding:8px; font-family:monospace;', 
            'color:red; font-size:14px; padding:3px; font-family:monospace;', 
            'color:#0f9def; font-size:14px; padding: 3px 0px 8px; font-family:monospace;');

    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        console.log('Đã nhận được nội dung trong script:', message);
        if (message.action === "getSessionStorage") {
            const sessionStorageData = JSON.stringify(sessionStorage);
            sendResponse({ data: sessionStorageData });
        }
    });

    DOMChanges();
    updateIframeSrc();
})();