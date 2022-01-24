import React, {useRef, useEffect} from 'react';
import './UserCreation.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { UserModel } from "../../model/User.model";

interface userCreationProps {
  onAddUser: (createdUser: UserModel) => void;
}

const UserCreation: React.FC = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const telephoneNumberInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const personnalLinkInputRef = useRef<HTMLInputElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);

  const formHandler = (event: React.FormEvent) => {
    const createdUser: UserModel = {
      name: nameInputRef.current!.value,
      lastName: lastNameInputRef.current!.value,
      telephoneNumber: +telephoneNumberInputRef.current!.value,
      email: emailInputRef.current!.value,
      age: +ageInputRef.current!.value,
      personalLink: personnalLinkInputRef.current!.value,
      tags: [...tagInputRef.current!.value]
    }
  }


  return (
    <div className="user-creation-container">
      <h2>create a user</h2>
      <div>
        <Input label={'Enter your user name'} reference={nameInputRef} type={'text'} />
        <Input label={'Enter your user last name'} reference={nameInputRef} type={'text'} />
        <Input label={'Enter your user telephone number'} reference={nameInputRef} type={'text'} />
        <Input label={'Enter your user email'} reference={nameInputRef} type={'text'} />
        <Input label={'Enter your user age'} reference={nameInputRef} type={'text'} />
        <Input label={'Enter your user personnal link'} reference={nameInputRef} type={'text'} />
        <Input label={'Enter your user tag'} reference={nameInputRef} type={'text'} />

        <Button text={"Submit"} onAction={() => {}} />
      </div>
    </div>
  );
};

export default UserCreation;