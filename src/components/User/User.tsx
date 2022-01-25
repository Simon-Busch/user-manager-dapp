import React from 'react';
import { UserModel } from '../../model/User.model';
import {User as UserIcon, AtSign, Phone, Link2} from 'react-feather'
import './User.css';

const User: React.FC<UserModel> = (props) => {
  // let tagsArray: string[] = []
  // if (props.tags && props.tags.includes(' ')) {
  //   tagsArray = props.tags.split(' ');
  // } else {
  //   tagsArray.push(props.tags);
  // }
  console.log(props.name,props.tags)

  return (
    <div className="user-container">
      <div className="user-container-1">
        <img src={`https://gateway.ipfs.io/ipfs/${props.ipfsHash}`} className="user-img" alt={`${props.name} avatar`}/>
      </div>
      <div className="user-container-2">
        <div>
          <h3><UserIcon color={"white"} size="15" strokeWidth="1.2" />{props.name}, {props.age}</h3>
        </div>
        <div>
          <p style={{marginLeft:'18px'}}>{props.lastName}</p>
        </div>
      </div>
      <div className="user-container-3">
        <p><AtSign color={"white"} size="15" strokeWidth="1.2" /> {props.email}</p>
        <p><Phone color={"white"} size="15" strokeWidth="1.2" /> {props.telephoneNumber}</p>
      </div>
      <div className="user-container-4">
        <a href={props.personalLink} target='_blank' rel='noreferrer' className="paragraph-grey user-link"><Link2 color={"white"} size="15" strokeWidth="1.2" /><p>{props.personalLink}</p></a>
        <div>
        <p className="tags">{props.tags}</p>
        {/* {tagsArray.map((tag,index) => {
          return <p key={index} className="tags">{tag}</p>
        })} */}
        </div>
      </div>
    </div>
  );
};

export default User;