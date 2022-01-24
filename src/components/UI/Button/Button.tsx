import React from 'react';
import './Button.css';

interface ButtonProps {
  onAction: () => void;
  text: string;
  // size: string;
}

const Button: React.FC<ButtonProps> = ({onAction, text}) => {
  return (
    <div onClick={onAction} className="button">
      <p className="paragraph-grey button-text">{text}</p>
    </div>
  );
};

export default Button;