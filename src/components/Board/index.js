import React, { Component } from 'react';
import Block from '../Block'
import './board.css'

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: []
    }
    this.renderBoard = this.renderBoard.bind(this)
    this.clearBoard = this.clearBoard.bind(this)
    this.handlePlace = this.handlePlace.bind(this)
    this.changeColor = this.changeColor.bind(this)
    this.socket = this.props.socket
  }

  handlePlace (id) {
    this.socket.emit('color', { color: this.props.color, id })
  }

  changeColor(data) {
    let blocks = [...this.state.blocks]
      blocks[data.id] = <Block id={data.id} key={data.id} color={data.color} handlePlace={this.handlePlace}/>
      this.setState({blocks})
  }

  renderBoard() {
    let blocks = []
    for (let i = 0; i < 5022; i++) {
      blocks.push(<Block id={i} key={i} handlePlace={this.handlePlace}/>)
    }
    this.setState({blocks})
  }

  clearBoard() {
    this.setState({blocks: []})
    this.renderBoard()
  }

  componentDidMount() {
    this.socket.on('data', blocks => {
      blocks.forEach(this.changeColor)
    })
    this.socket.on('color', this.changeColor)
    this.socket.on('clear', this.clearBoard)
    this.renderBoard()
  }
  componentWillUnmount() {
    this.socket.removeListener('color')
    this.socket.removeListener('data')
  }
  render() {
    return (
      <div id="board">
        {this.state.blocks}
      </div>
    );
  }
}

export default Board;