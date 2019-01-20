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
      <button style={{ background: this.state.color, display: this.state.display }} className="btn" onClick={this.props.onClick}>
        {this.state.text}
      </button>
    );
  }
}

export default Button;