import React from 'react';
import './StyleMainPage/ParametersBox.css';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      color: props.color,
      display: props.display
    };
  }

  render() {
    return (
      <button onClick={this.props.handleClick} style={{ background: this.state.color, display: this.state.display }} className="btn">
        {this.state.text}
      </button>
    );
  }
}

export default Button;