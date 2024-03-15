const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const buttonIcon = document.getElementById('button-icon');
const info = document.querySelector('.info');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value.trim();

    if (message === '') {
        return;
    } else if (message.toLowerCase() === 'developer') {
        userInput.value = '';
        appendMessage('user', message);

        setTimeout(() => {
            appendMessage('bot', 'This is Source Coded By Innocent Mwenda \nGithub : @Guilty03');
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }, 2000);
        return;
    }

    appendMessage('user', message);
    userInput.value = '';

    const data = JSON.stringify({ query: message });
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            const botResponse = JSON.parse(this.responseText).response;
            if (this.status === 200) {
                appendMessage('bot', botResponse);
            } else {
                appendMessage('bot', 'Error: Check your API key!');
            }
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }
    });

    buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
    buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');

    xhr.open('POST', 'https://chatgpt-gpt4-ai-chatbot.p.rapidapi.com/ask');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.setRequestHeader('X-RapidAPI-Key', '9511636406msh897acf8b1e3b8d9p1aa774jsna223a3d2f7e3');
    xhr.setRequestHeader('X-RapidAPI-Host', 'chatgpt-gpt4-ai-chatbot.p.rapidapi.com');
    xhr.send(data);
}

function appendMessage(sender, message) {
    info.style.display = "none";

    const messageElement = document.createElement('div');
    const iconElement = document.createElement('div');
    const chatElement = document.createElement('div');
    const icon = document.createElement('i');

    chatElement.classList.add("chat-box");
    iconElement.classList.add("icon");
    messageElement.classList.add(sender);
    messageElement.innerText = message;

    if (sender === 'user') {
        icon.classList.add('fa', 'fa-user');
        iconElement.setAttribute('id', 'user-icon');
    } else {
        icon.classList.add('fa', 'fa-robot');
        iconElement.setAttribute('id', 'bot-icon');
    }

    iconElement.appendChild(icon);
    chatElement.appendChild(iconElement);
    chatElement.appendChild(messageElement);
    chatLog.appendChild(chatElement);
    chatLog.scrollTo(0, chatLog.scrollHeight);
}
		  
