// Make sure this runs inside Telegram Web App
const output = document.getElementById('output');
const getDataBtn = document.getElementById('getDataBtn');

getDataBtn.addEventListener('click', () => {
    try {
        // tgWebAppInitData is automatically injected by Telegram App
        const tgData = window.Telegram.WebApp.initData; // full initData string
        const parsedData = window.Telegram.WebApp.initDataUnsafe?.user || null; // user info
        
        let displayText = '';
        if (parsedData) {
            displayText += `User Info:\nID: ${parsedData.id}\nName: ${parsedData.first_name} ${parsedData.last_name || ''}\nUsername: ${parsedData.username || 'N/A'}\n`;
        } else {
            displayText += 'User data not available.\n';
        }

        displayText += `\nFull Init Data:\n${tgData || 'Not available'}`;

        output.textContent = displayText;

        // Copy to clipboard
        navigator.clipboard.writeText(tgData || '').then(() => {
            console.log('InitData copied to clipboard!');
        }).catch(err => console.error('Clipboard error:', err));

    } catch (err) {
        output.textContent = 'Error fetching data: ' + err;
    }
});
