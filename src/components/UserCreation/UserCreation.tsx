import React, {useRef, useState} from 'react';
import './UserCreation.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { UserModel } from "../../model/User.model";
import Capture from '../UI/Input/Capture';

interface userCreationProps {
  onAddUser: (createdUser: UserModel) => void;
}

const UserCreation: React.FC<userCreationProps> = () => {
  // const [buffer,setBuffer] = useState<Buffer | string>('');
  const [ipfsHash, setIpfsHash] = useState<string>('');
  const nameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const telephoneNumberInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const personnalLinkInputRef = useRef<HTMLInputElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);


  const formHandler = (event: React.FormEvent) => {
    let tagsArray = [];
    tagsArray.push(tagInputRef.current!.value);

    const createdUser: UserModel = {
      name: nameInputRef.current!.value,
      lastName: lastNameInputRef.current!.value,
      telephoneNumber: +telephoneNumberInputRef.current!.value,
      email: emailInputRef.current!.value,
      age: +ageInputRef.current!.value,
      personalLink: personnalLinkInputRef.current!.value,
      ipfsHash:ipfsHash,
      tags: tagsArray
    }
  }

  const captureHandler = (text: string) => {
    setIpfsHash(text);
  }

  return (
    <div className="user-creation-container">
      <h2>create a user</h2>
      <div>
        <Input label={'Enter your user name'} reference={nameInputRef} type={'text'} />
        <Input label={'Enter your user last name'} reference={lastNameInputRef} type={'text'} />
        <Input label={'Enter your user telephone number'} reference={telephoneNumberInputRef} type={'text'} />
        <Input label={'Enter your user email'} reference={emailInputRef} type={'text'} />
        <Input label={'Enter your user age'} reference={ageInputRef} type={'text'} />
        <Input label={'Enter your user personnal link'} reference={personnalLinkInputRef} type={'text'} />
        <Input label={'Enter your user tag'} reference={tagInputRef} type={'text'} />
        <Capture onCapture={captureHandler} />
        <Button text={"Submit"} onAction={formHandler} />
      </div>
    </div>
  );
};

export default UserCreation;