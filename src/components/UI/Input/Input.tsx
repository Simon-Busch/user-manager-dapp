import React from 'react';
import './Input.css';

interface InputProps {
  label: string;
  type: string;
  reference: any;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <div className="input-container">
      <label>{props.label} </label>
      <input type={props.type} ref={props.reference} required />
    </div>
  );
};

export default Input;