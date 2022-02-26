import React from "react";
import "./Greetings.css";
interface GreetingsProps {
  account: string | null;
}

const Greetings: React.FC<GreetingsProps> = ({ account }) => {
  return (
    <div className="greetings-container">
      <p className="paragraph-grey">Hey ! Welcome back {account} ✌🏼</p>
    </div>
  );
};

export default Greetings;
