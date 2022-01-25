import React from 'react';
import User from '../User/User';
import { UserModel } from '../../model/User.model';
import './UserList.css';

interface UserListProps {
  usersList: UserModel[];
  deleteUser: (userId: any) => void;
}

const UserList: React.FC<UserListProps> = (props) => {
  return (
    <ul>
      {props.usersList.map((user) => {
        return (
          <User
            key={user.id ? user.id : Math.random()*155555}
            id={user.id}
            name={user.name}
            lastName={user.lastName}
            telephoneNumber={user.telephoneNumber}
            email={user.email}
            age={user.age}
            ipfsHash={user.ipfsHash}
            personalLink={user.personalLink}
            tags={user.tags}
            deleteUser={props.deleteUser}
          />
        )
      })}
    </ul>
  );
};

export default UserList;