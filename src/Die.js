import React, { Component } from 'react';
import './Die.css';

class Die extends Component {
  constructor(props) {
    super(props)
    this.handleRoll = this.handleRoll.bind(this)
  }
  handleRoll() {
    this.props.handleClickInChild(this.props.idx)
  }
  render() {
    return (
      <button
        className="Die"
        style={{ backgroundColor: this.props.locked ? "darkred" : "red" }}
        onClick={this.handleRoll}>
        {this.props.val}
      </button>
    )
  }
}

export default Die;