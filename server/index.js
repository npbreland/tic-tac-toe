const app = require('express')();
const cors = require('cors');
app.use(cors());
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3002"
  }
});

io.on('connection', client => {
  client.on('I moved', data => {
    const { cellContents } = data;
    io.emit(`player moved`, cellContents);
  });
  client.on('restart', () => io.emit('restarted'));
});

server.listen(3001, () => console.log('Server listening on 3001'));
