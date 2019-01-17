import React from 'react';

const Input = props => (
  <input type={props.type} value={props.value} name={props.value} onChange={props.onChange} />
);

export default Input;