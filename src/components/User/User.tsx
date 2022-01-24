import React from 'react';
import { UserModel } from '../../model/User.model';
import './User.css';

const User: React.FC<UserModel> = (props) => {
  return (
    <div className="user-container">
      <div className="user-container-1">
        <img src={`https://gateway.ipfs.io/ipfs/${props.ipfsHash}`} className="user-img" alt={`${props.name} avatar`}/>
      </div>
      <div className="user-container-2">
        <div>
          <h3>{props.name}, {props.age}</h3>
        </div>
        <div>
          <p>{props.lastName}</p>
        </div>
      </div>
      <div className="user-container-3">
        <p>{props.email}</p>
        <p>{props.telephoneNumber}</p>
      </div>
      <div className="user-container-4">
        <a href={props.personalLink} target='_blank' rel='noreferrer'>{props.personalLink}</a>
        <div>
        {props.tags.map((tag,index) => {
          return <p key={index} className="tags">{tag}</p>
        })}
        </div>
      </div>
    </div>
  );
};

export default User;