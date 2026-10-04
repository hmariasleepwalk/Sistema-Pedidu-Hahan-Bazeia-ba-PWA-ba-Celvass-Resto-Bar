// Chatbot Logic ba Celvass Resto Bar
const API_KEY = "AQ.Ab8RN6KwmUjylRo19qGBS90OjGGZuVz5E4jAQIUiVS6aWEn8yw"; // Tau Ita nia Gemini API Key

const SYSTEM_PROMPT = `
O mak chatbot AI ba restaurante no bar ho naran "Celvass Resto Bar".
O nia kargo mak atu responde kliante sira uza LIAN TETUN ne'ebé matenek, mós, no edukadu.
Informasaun Celvass Resto Bar:
- Servisu: Pedidu hahan no hemu (PWA app).
- Menú Favorit: Katupa, Ikan Saboko, Bifi, Sumo Fruktas, Servesa, no Soft Drinks.
- Horas Loke: Segunda ba Sábadu (10:00 dadeers - 22:00 kalan).
- Papél: Fó rekomendasaun menú, esplikasaun prosesu pedidu iha PWA app, no hatán pergunta geral.
Rai resposta sira badak no klaru.
`;

function toggleChat() {
  const chatBox = document.getElementById('chat-box');
  chatBox.classList.toggle('chat-box-hidden');
}

function handleKeyPress(event) {
  if (event.key === 'Enter') sendMessage();
}

async function sendMessage() {
  const inputEl = document.getElementById('user-input');
  const userText = inputEl.value.trim();
  if (!userText) return;

  appendMessage(userText, 'user');
  inputEl.value = '';

  const loadingEl = appendMessage('Ein, hein uma minutu...', 'bot');

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT + "\n\nPergunta Kliante: " + userText }] }
        ]
      })
    });

    const data = await response.json();
    const reply = data.candidates[0].content.parts[0].text;
    loadingEl.innerText = reply;
  } catch (error) {
    loadingEl.innerText = "Deskulpa, iha erru ruma. Favór koko fali.";
    console.error(error);
  }
}

function appendMessage(text, sender) {
  const msgContainer = document.getElementById('chat-messages');
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  msgDiv.innerText = text;
  msgContainer.appendChild(msgDiv);
  msgContainer.scrollTop = msgContainer.scrollHeight;
  return msgDiv;
}
