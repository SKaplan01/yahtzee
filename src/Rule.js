import React, { Component } from 'react';
import './Rule.css'


// add count property? 
class Rule extends Component {
  render() {
    return (
      <tr className="Rule Rule-active" onClick={this.props.doScore}>
        <td className="Rule-name">{this.props.name}</td>
        <td className="Rule-score">{this.props.score}</td>
      </tr>
    )
  }
}

export default Rule;