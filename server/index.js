const app = require('express')();
const cors = require('cors');
app.use(cors());
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

io.on('connection', client => {
  client.on('state change', data => {
    io.emit('state change', data);
  });
});

server.listen(3001, () => console.log('Server listening on 3001'));
