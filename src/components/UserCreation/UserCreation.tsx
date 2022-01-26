import React, { useRef, useState } from "react";
import "./UserCreation.css";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { UserModel } from "../../model/User.model";
import Capture from "../UI/Input/Capture";

interface userCreationProps {
  onAddUser?: (createdUser: UserModel) => void;
  onUpdateUserHandler?: (updatedUser: UserModel) => void;
  title: string;
  defaultName?: string;
  defaultLastName?: string;
  defaultTelephoneNumber?: number;
  defaultEmail?: string;
  defaultAge?: number;
  defaultPersonalLink?: string;
  defaultIpfsHash?: string;
  defaultTags?: string;
  defaultId?: number | any;
  isEditing: boolean;
}

const UserCreation: React.FC<userCreationProps> = (props) => {
  const [ipfsHash, setIpfsHash] = useState<string>(
    "QmWCVgLqsoa5MH8q2USpY2i3UCbdiyNDjqh9TBCs8Fh4KK"
  );
  const nameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const telephoneNumberInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const personnalLinkInputRef = useRef<HTMLInputElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);

  const formHandler = (event: React.FormEvent) => {
    if (
      nameInputRef.current!.value &&
      lastNameInputRef.current!.value &&
      emailInputRef.current!.value &&
      personnalLinkInputRef.current!.value &&
      ipfsHash &&
      tagInputRef.current!.value &&
      +ageInputRef.current!.value &&
      +telephoneNumberInputRef.current!.value 
    ) {
      const createdUser: UserModel = {
        name: nameInputRef.current!.value,
        lastName: lastNameInputRef.current!.value,
        telephoneNumber: +telephoneNumberInputRef.current!.value,
        email: emailInputRef.current!.value,
        age: +ageInputRef.current!.value,
        personalLink: personnalLinkInputRef.current!.value,
        ipfsHash: ipfsHash,
        tags: tagInputRef.current!.value,
      };
      props.onAddUser!(createdUser);
    } else {
      alert("Please fill all fields");
    }
  };

  const editHandler = (event: React.FormEvent) => {
    let imgHash: string = "";
    if (props.defaultIpfsHash) {
      imgHash =
        props.defaultIpfsHash !== ipfsHash ? ipfsHash : props.defaultIpfsHash;
    }

    const updatedUser: UserModel = {
      id: props.defaultId,
      name: nameInputRef.current!.value,
      lastName: lastNameInputRef.current!.value,
      telephoneNumber: +telephoneNumberInputRef.current!.value,
      email: emailInputRef.current!.value,
      age: +ageInputRef.current!.value,
      personalLink: personnalLinkInputRef.current!.value,
      ipfsHash: imgHash,
      tags: tagInputRef.current!.value,
    };
    props.onUpdateUserHandler!(updatedUser);
  };

  const captureHandler = (text: string) => {
    setIpfsHash(text);
  };

  return (
    <div className="user-creation-container">
      <h2>{props.title}</h2>

      <div>
        <Input
          label={"Enter your user name"}
          reference={nameInputRef}
          type={"text"}
          value={props.defaultName}
        />
        <Input
          label={"Enter your user last name"}
          reference={lastNameInputRef}
          type={"text"}
          value={props.defaultLastName}
        />
        <Input
          label={"Enter your user telephone number"}
          reference={telephoneNumberInputRef}
          type={"number"}
          value={props.defaultTelephoneNumber}
        />
        <Input
          label={"Enter your user email"}
          reference={emailInputRef}
          type={"text"}
          value={props.defaultEmail}
        />
        <Input
          label={"Enter your user age"}
          reference={ageInputRef}
          type={"number"}
          value={props.defaultAge}
        />
        <Input
          label={"Enter your user personnal link"}
          reference={personnalLinkInputRef}
          type={"text"}
          value={props.defaultPersonalLink}
        />
        <Input
          label={"Enter your user tag"}
          reference={tagInputRef}
          type={"text"}
          value={props.defaultTags}
        />
        <Capture onCapture={captureHandler} />
      </div>

      <Button
        text={"Submit"}
        onAction={props.isEditing === true ? editHandler : formHandler}
      />
    </div>
  );
};

export default UserCreation;
