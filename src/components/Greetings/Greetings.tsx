import React from 'react';
import './Greetings.css';
interface GreetingsProps {
  account: string
}

const Greetings: React.FC<GreetingsProps> = ({account}) => {
  return (
    <div>
      <p className="paragraph-grey">Hey ! Welcome back {account} ✌🏼</p>
    </div>
  );
};

export default Greetings;