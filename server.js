const express = require('express')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
  origins: '*:*'
})
const cors = require('cors')

const port = process.env.PORT || 3000

let board = []
let onlineUsers = 0;

app.use(cors({
  origin: '*'
}))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', false);
  next();
});

io.on('connection', (socket) => {
  onlineUsers++
  io.emit('users', onlineUsers)
  socket.on('disconnect', function () {
    onlineUsers--
    io.emit('users', onlineUsers)
  })
})

app.use('/', express.static('build'))

app.get('/board', (req, res) => {
  res.send(board)
})

app.post('/clear', (req, res) => {
  board = []
  io.emit('clear')
  res.send('Board has been cleared!')
})

io.on('connection', (socket) => {
  socket.emit('data', board)
  socket.on('color', color => {
    board.push(color)
    io.emit('color', color)
  })
})

http.listen(port, () => {
  console.log(`Server open on port ${port}`)
})