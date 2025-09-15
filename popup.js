// Buttons
document.getElementById('query_id').addEventListener('click', () => {
    extractQueryId();
});

document.getElementById('user=').addEventListener('click', () => {
    extractUser();
});

document.getElementById('iframe_src').addEventListener('click', () => {
    extractIframe();
});

document.getElementById('getAuth').addEventListener('click', () => {
    extractToken();
});

function showOutput(text) {
    const output = document.getElementById('output');
    output.innerHTML += `<pre>${text}</pre>`;
    navigator.clipboard.writeText(text).then(() => console.log("Copied to clipboard"));
}

// Extract Query_ID
function extractQueryId() {
    try {
        const iframe = document.querySelector('iframe');
        const url = decodeURIComponent(iframe.src);
        const queryId = url.split('tgWebAppData=')[1] || "Not Found";
        showOutput("Query_ID: " + queryId);
    } catch {
        showOutput("Query_ID not found 😭");
    }
}

// Extract User
function extractUser() {
    try {
        const iframe = document.querySelector('iframe');
        const url = decodeURIComponent(iframe.src);
        const userPart = url.split('user=')[1] || "Not Found";
        showOutput("User=%7B...: " + userPart);
    } catch {
        showOutput("User data not found 😭");
    }
}

// Extract Iframe
function extractIframe() {
    try {
        const iframe = document.querySelector('iframe');
        showOutput("Iframe src: " + iframe.src);
    } catch {
        showOutput("Iframe not found 😭");
    }
}

// Extract Token
function extractToken() {
    try {
        const iframe = document.querySelector('iframe');
        const token = iframe.src.split('#')[1] || "Not Found";
        showOutput("Token: " + token);
    } catch {
        showOutput("Token not found 😭");
    }
}
