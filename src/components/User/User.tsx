import React, { useState } from "react";
import { UserModel } from "../../model/User.model";
import { User as UserIcon, AtSign, Phone, Link2, X, Edit } from "react-feather";
import UserCreation from "../UserCreation/UserCreation";
import "./User.css";

interface UserProps {
  deleteUser: (id: any) => void;
  updateUser: (updatedUser: UserModel) => void;
}

type Props = UserModel & UserProps;

const User: React.FC<Props> = (props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const deleteHandler = () => {
    props.deleteUser(props.id);
  };

  const editHandler = () => {
    setIsEditing(!isEditing);
  };
  return (
    <>
      {isEditing === false ? (
        <div className="user-container">
          <div className="user-container-1">
            <img
              src={`https://gateway.ipfs.io/ipfs/${props.ipfsHash}`}
              className="user-img"
              alt={`${props.name} avatar`}
            />
          </div>
          <div className="user-container-2">
            <div>
              <h3>
                <UserIcon color={"white"} size="15" strokeWidth="1.2" />
                {props.name}, {props.age}
              </h3>
            </div>
            <div>
              <p style={{ marginLeft: "18px" }}>{props.lastName}</p>
            </div>
          </div>
          <div className="user-container-3">
            <p>
              <AtSign color={"white"} size="15" strokeWidth="1.2" />{" "}
              {props.email}
            </p>
            <p>
              <Phone color={"white"} size="15" strokeWidth="1.2" />{" "}
              {props.telephoneNumber}
            </p>
          </div>
          <div className="user-container-4">
            <a
              href={props.personalLink}
              target="_blank"
              rel="noreferrer"
              className="paragraph-grey user-link"
            >
              <Link2 color={"white"} size="15" strokeWidth="1.2" />
              <p>{props.personalLink}</p>
            </a>
            <div>
              <p className="tags">{props.tags}</p>
            </div>
          </div>
          <div className="user-container-4">
            <Edit
              color={"white"}
              size="15"
              strokeWidth="1.2"
              onClick={editHandler}
            />
            <X
              color={"red"}
              size="15"
              strokeWidth="1.2"
              onClick={deleteHandler}
            />
          </div>
        </div>
      ) : (
        <div className="edit-container">
          <Edit
            color={"white"}
            size="15"
            strokeWidth="1.2"
            onClick={editHandler}
          />
          <UserCreation
            defaultName={props.name}
            defaultLastName={props.lastName}
            defaultTelephoneNumber={props.telephoneNumber}
            defaultEmail={props.email}
            defaultAge={props.age}
            defaultPersonalLink={props.personalLink}
            defaultIpfsHash={props.ipfsHash}
            defaultTags={props.tags}
            defaultId={props.id}
            isEditing={true}
            title={"Update User"}
            onUpdateUserHandler={props.updateUser}
          />
        </div>
      )}
    </>
  );
};

export default User;
