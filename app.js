// Telegram WebApp object
const tg = window.Telegram.WebApp;

// Ready + expand
tg.ready();
try { tg.expand(); } catch (e) {}

// UI elements
const input = document.getElementById("msg");
const btn = document.getElementById("sendBtn");
const output = document.getElementById("output");

// Show user info if available
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
  const user = tg.initDataUnsafe.user;
  output.innerHTML = `<p>Hi, ${user.first_name || ""} 👋</p>`;
}

// Send data to bot on button click
btn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) {
    alert("कृपया कुछ लिखें!");
    return;
  }

  // Send to bot (will be received in web_app_data)
  tg.sendData(JSON.stringify({ message: text }));

  // Show feedback
  output.innerHTML += `<p>Sent: ${text}</p>`;

  // Optionally close app after sending
  // tg.close();
});
