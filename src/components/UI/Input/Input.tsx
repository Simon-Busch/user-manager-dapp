import React from "react";
import "./Input.css";

interface InputProps {
  label: string;
  type: string;
  reference: any;
  onChangeHandler?: any;
  value?: string | number;
}

const Input: React.FC<InputProps> = ({label, type, reference, value}) => {
  return (
    <div className="input-container">
      <label>{label} </label>
      <input
        type={type}
        ref={reference}
        defaultValue={value || ""}
        required
      />
    </div>
  );
};

export default Input;
