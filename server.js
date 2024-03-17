const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
const port = 8000;
const messages = [];
const users = [];


// Middleware do serwowania plików statycznych
app.use(express.static(path.join(__dirname, 'client')));

// Endpoint dla głównego linku
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Start serwera nasłuchującego na danym porcie
 const server = app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});

const io = socket(server)

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
   socket.on('join', (user) => {
    users.push({user: user, id:socket.id}) 
  });

   
  socket.on('disconnect', () => { console.log('Oh, socket ' + socket.id + ' has left')
  const index = users.findIndex(user => user.id === socket.id)
   users.splice(index, 1) });

  console.log('I\'ve added a listener on message and disconnect events \n');
});

