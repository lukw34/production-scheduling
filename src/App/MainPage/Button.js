import React from 'react';
import './StyleMainPage/ParametersBox.css';

const Button = ({
  onClick, disabled = false, color: background, display, text
}) => (
  <button
    style={{ background, display }}
    className="btn"
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

export default Button;