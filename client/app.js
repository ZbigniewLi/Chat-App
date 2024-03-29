const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');
const socket = io();

socket.on('message', ({ author, content }) => addMessage(author, content))



let userName = ''; // Nazwa użytkownika
let messageList = []; // Tablica przechowująca listę wiadomości

function handleJoin(e) {
  e.preventDefault()
  if (
    userNameInput.value.length > 0
  ) {
    loginForm.classList.remove('show')
    messagesSection.classList.add('show')
    userName = userNameInput.value
    socket.emit('join', userName);
  }
}

loginForm.addEventListener('submit', handleJoin)
 

 
function sendMessage(e) {
  e.preventDefault();

  let messageContent = messageContentInput.value;

  if (!messageContent.length) {
    alert('You have to type something!');
  }
  else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent })
    messageContentInput.value = '';
  }
}


addMessageForm.addEventListener('submit', sendMessage)





function addMessage(author, content) {
  console.log(author, content)
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if (author === userName) message.classList.add('message--self');
  message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author}</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
  messagesList.appendChild(message);
}

