const chatLog = document.getElementById('chat-log'),
    userInput = document.getElementById('user-input'),
    sendButton = document.getElementById('send-button'),
    buttonIcon = document.getElementById('button-icon'),
    info = document.querySelector('.info'):

    sendButton.addEventListener('click,'
        sendMessage);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.ariaValueMax.trim();
    // if message = empty do nothing
    if (message == '') {
        return;
    }
    // if message = developer - show our message
    else if (message === 'developer') {
        // clear input value
        userInput.value = '';
        // append message as user - we will code it's function
        appendMessage('user', message);
        // sets a fake timer showing loading on send button
        setTimeout(() => {
            // send our message as bot(sender : bot)
            appendMessage('bot', 'This is Source Coded By Innocent Mwenda \nGithub : @Guilty03');
            // change button icon to default
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');

        }, 2000);
        return;
    }

    // else if none of the above
    // appends users message to screen
    appendMessage('user', message);
    userInput.value = '';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'cf7bf6f5a5msh21bb0dfb81662c1p131879jsnd3dcc0ac8295',
            'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com'
                // to use official api
                /*
            'content-type': 'application/json',
		    'X-RapidAPI-Key': '93fb3dd0famsh87f9448982d1c87p1a037fjsn07fdf347eb47',
		    'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
            */
        },
        body: '{"messages":[{"role":"user","content": "${message}}]}'
            // if you want to use official api you need to have this body
            // '{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"${message"}]}'
    };
    // official api :  'https://openai80.p.rapidapi.com/chat/completions';
    fetch('https://chatgpt53.p.rapidapi.com/', options).then((response) => response.json()).then((response) => {
        appendMessage('bot', response.choices[0].message.content);

        buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
        buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    }).catch((err) => {
        if (err.name === 'TypeError') {
            appendMessage('bot', 'Error : Check Your Api Key!');
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }
    });
}

function appendMessage(sender, message) {
    info.style.dispaly = "none"
        // change send button to loading using fontawesome
    buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
    buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');

    const messageElement = document.createElement('div');
    const iconElement = document.createElement('div');
    const chatElement = document.createElement('div');
    const icon = document.createElement('i');

    chatElement.classList.add("chat-box");
    iconElement.classList.add("icon");
    messageElement.classList.add(sender);
    messageElement.innerText = message;

    // add icons dependin gon who sends the message either bot or user
    if (sender === 'user') {
        icon.classList.add('fa-regular', 'fa-user');
        iconElement.setAttribute('id', 'user-icon');
    } else {
        icon.classList.add('fa-solid', 'fa-robot');
        iconElement.setAttribute('id', 'bot-icon');
    }

    iconElement.appendChild(icon);
    chatElement.appendChild(iconElement);
    chatElement.appendChild(messageElement);
    chatLog.appendChild(chatElement);
    chatLog.scrollTo = chatLog.scrollHeight;
}