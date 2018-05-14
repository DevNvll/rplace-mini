import React, { Component } from 'react';
import './header.css'

class Header extends Component {
  render() {
    return (
      <div>
        <h1 className="title"><span>R</span>Place<small> MINI</small></h1>
        <h3 className="users">{this.props.users} users online</h3>
      </div>
    );
  }
}

export default Header;