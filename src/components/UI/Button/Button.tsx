import React from 'react';
import './Button.css';

interface ButtonProps {
  onAction: (event?: any) => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({onAction, text}) => {
  return (
    <div onClick={onAction} className="button" data-test-id="button">
      <p className="paragraph-grey button-text">{text}</p>
    </div>
  );
};

export default Button;