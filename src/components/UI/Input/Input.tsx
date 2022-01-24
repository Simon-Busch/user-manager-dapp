import React from 'react';
import Button from '../Button/Button';
import './Input.css';

interface InputProps {
  label: string;
  type: string;
  reference: any;
  onChangeHandler?: any;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <div className="input-container">
      <label>{props.label} </label>
      <input type={props.type} ref={props.reference} required />
      {/* {
        props.type === "file" ?
        <Button text="Upload" onAction={props.onChangeHandler} /> : ''
      } */}
    </div>
  );
};

export default Input;