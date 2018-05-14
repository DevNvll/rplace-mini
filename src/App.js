import React, { Component } from 'react'
import socket from 'socket.io-client'

import Header from './components/Header'
import Board from './components/Board'
import ColorPallete from './components/ColorPallete'

import './App.css'

const io = socket()
const colors = ['#111111','#FFFFFF','#AAAAAA','#F012BE','#FF4136','#FFDC00','#DDDDDD','#FF851b','#01FF70','#2ECC40','#7FDBFF','#0074D9','#39CCCC','#B10DC9','#3D9970']

class App extends Component {
  state = {
    users: 0,
    color: '#111111'
  }
  changeColor(color) {
    this.setState({ color })
  }
  componentDidMount() {
    io.on('users', users => this.setState({ users }))
  }
  componentWillUnmount() {
    io.removeListener('users')
  }
  render() {
    return (
      <div>
        <main className="center">
          <Header users={this.state.users} />
          <br />
          <Board socket={io} color={this.state.color} />
          <ColorPallete colors={colors} handleChange={this.changeColor.bind(this)} />
        </main>
        <div className="hm">
          <a
            href="https://github.com/devnvll"
            rel="noopener noreferrer"
            target="_blank"
          >
            H // M
          </a>
        </div>
      </div>
    )
  }
}

export default App
