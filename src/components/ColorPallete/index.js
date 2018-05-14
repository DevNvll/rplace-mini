import React, { Component } from 'react'
import './ColorPallete.css'

function ColorBlock({ color, onChangeColor, isSelected }) {
  return (
    <span
      id={color}
      key={color}
      style={
        isSelected === color
          ? {
              backgroundColor: color,
              border: `3px solid ${color}`,
              animation: 'pulse 2s infinite'
            }
          : { backgroundColor: color }
      }
      onClick={() => onChangeColor(color)}
    />
  )
}

class ColorPallete extends Component {
  constructor(props) {
    super(props)
    this.changeColor = this.changeColor.bind(this)
  }
  state = {
    selected: '#111111'
  }
  changeColor(color) {
    console.log(color)
    this.props.handleChange(color)
    this.setState({ selected: color })
  }
  render() {
    const { selected } = this.state
    return (
      <div className="colorpallete">
        {this.props.colors.map(color => (
          <ColorBlock
            color={color}
            isSelected={selected}
            onChangeColor={this.changeColor}
          />
        ))}
      </div>
    )
  }
}

export default ColorPallete
