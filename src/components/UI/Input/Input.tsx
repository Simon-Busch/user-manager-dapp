import React from 'react';
import './Input.css';

interface InputProps {
  label: string;
  type: string;
  reference: any;
  onChangeHandler?: any;
  value?: string | number;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <div className="input-container">
      <label>{props.label} </label>
      <input type={props.type} ref={props.reference} defaultValue={props?.value || ''} required />
    </div>
  );
};

export default Input;