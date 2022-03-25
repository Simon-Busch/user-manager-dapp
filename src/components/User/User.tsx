import React, { useEffect, useState } from "react";
import { UserModel } from "../../model/User.model";
import { User as UserIcon, AtSign, Phone, Link2, X, Edit } from "react-feather";
import UserCreation from "../UserCreation/UserCreation";
import "./User.css";

interface UserProps {
  deleteUser: (id: any) => void;
  updateUser: (updatedUser: UserModel) => void;
}

type Props = UserModel & UserProps;

const User: React.FC<Props> = ({
  deleteUser,
  updateUser,
  id,
  tags,
  ipfsHash,
  name,
  age,
  lastName,
  email,
  telephoneNumber,
  personalLink
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tagsArray, setTagsArray] = useState<string[]>([""]);

  const deleteHandler = () => {
    deleteUser(id);
  };

  const editHandler = () => {
    setIsEditing(!isEditing);
  };
  useEffect(() => {
    if (tags && tags.includes(",")) {
      setTagsArray(tags.split(","));
    } else {
      setTagsArray([tags]);
    }
  }, [tags]);

  return (
    <>
      {isEditing === false ? (
        <div className="user-container">
          <div className="user-container-buttons">
            <Edit
              color={"white"}
              size="20"
              strokeWidth="1.4"
              onClick={editHandler}
              style={{
                marginRight:"10px",
                cursor:"pointer"
              }}
            />
            <X
              color={"red"}
              size="20"
              strokeWidth="1.4"
              onClick={deleteHandler}
              style={{
                marginRight:"10px",
                cursor:"pointer"
              }}
            />
          </div>
          <div className="user-container-1">
            <img
              src={`https://gateway.ipfs.io/ipfs/${ipfsHash}`}
              className="user-img"
              alt={`${name} avatar`}
            />
            <div>
              <div>
                <h3>
                  <UserIcon color={"white"} size="15" strokeWidth="1.2" style={{marginRight:"10px"}} />
                  {name}, {age}
                </h3>
              </div>
              <div>
                <p style={{ marginLeft: "18px" }}>{lastName}</p>
              </div>
            </div>
          </div>
          <div className="user-container-3">
            <p>
              <AtSign color={"white"} size="15" strokeWidth="1.2" style={{marginRight:"10px"}} />{" "}
              {email}
            </p>
            <p>
              <Phone color={"white"} size="15" strokeWidth="1.2" style={{marginRight:"10px"}} />{" "}
              {telephoneNumber}
            </p>
            <a
              href={personalLink}
              target="_blank"
              rel="noreferrer"
              className="paragraph-grey user-link"
            >
              <Link2 color={"white"} size="15" strokeWidth="1.2" />
              <p>{personalLink}</p>
            </a>
          </div>
          <div className="user-container-4">
            <p className="paragraph-grey" style={{textAlign:"center", marginBottom:"10px"}}>Tags</p>
            <div>
              {tagsArray.map((tag, index) => {
                return (
                  <p key={index} className="tags">
                    {tag}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="edit-container">
          <div className="edit-container__button">
            <Edit
              color={"white"}
              size="25"
              strokeWidth="1.4"
              onClick={editHandler}
            />
          </div>
          <div>
            <UserCreation
              defaultName={name}
              defaultLastName={lastName}
              defaultTelephoneNumber={telephoneNumber}
              defaultEmail={email}
              defaultAge={age}
              defaultPersonalLink={personalLink}
              defaultIpfsHash={ipfsHash}
              defaultTags={tags}
              defaultId={id}
              isEditing={true}
              title={"Update User"}
              onUpdateUserHandler={updateUser}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default User;
