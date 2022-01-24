import React from 'react';
import User from '../User/User';
import './UserList.css';

const UserList = () => {
  return (
    <ul>
      <User 
        id={1}
        name={"Simon"}
        lastName={"Busch"}
        telephoneNumber={123456789}
        email={"simon@simon.com"}
        age={32}
        ipfsHash={"QmdocV9tSr7qvRe3qmC3J7AwWw4D5pj8gnMPnWrneZjJfD"}
        personalLink={"https://github.com/Simon-Busch"}
        tags={["frontend engineer", "blockchain dev", "solidity lover"]}
      />
    </ul>
  );
};

export default UserList;