import React, {useState, useEffect} from 'react';
import './App.css';
import {ethers} from 'ethers';
import UserList from './components/UserList/UserList';
import Greetings from './components/Greetings/Greetings';
import Button from './components/UI/Button/Button';
import UserCreation from './components/UserCreation/UserCreation'
import { UserModel } from './model/User.model';
import UserManagerContractABI from "./artifacts/contracts/UserManager.sol/UserManager.json";
import toast, { Toaster } from 'react-hot-toast';
declare let window: any;

const dummyData: UserModel[] = [{
  id:0,
  name: "Simon",
  lastName: "Busch",
  telephoneNumber: 123456789,
  email: "simon@simon.com",
  age: 32,
  ipfsHash: "QmdocV9tSr7qvRe3qmC3J7AwWw4D5pj8gnMPnWrneZjJfD",
  personalLink: "https://github.com/Simon-Busch",
  tags:'frontend engineer',
}];

const App: React.FC = () => {
  const [ currentAccount, setCurrentAccount ] = useState<string | null>(null);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ userManagerContract, setUserManagerContract ] = useState<any>(null);
  const [ userList, setUserList ] = useState<UserModel[] | null>(null);
  const [ isCreating, setIsCreating ] = useState<boolean>(false);
  const USER_MANAGER_CONTRACT_ADDRESS:string = "0xCC18deC0902B254f98FdDb97020a398939215BfE";

  const creatingHandler = () => {
    setIsCreating(!isCreating);
  }

  const checkIfWalletIsConnected = async () => {
		try {
      let ethereum: any;
			ethereum = window.ethereum;
			if (!ethereum) {
				console.log('Make sure you have MetaMask!');
				setIsLoading(false);
				return;
			} else {
        let chainId = await ethereum.request({ method: 'eth_chainId' });

        const rinkebyChainId = "0x4"; 
        if (chainId !== rinkebyChainId) {
          alert("Please switch network to Rinkeby test network 🦊");
          setIsLoading(false);
          return;
        }
				const accounts = await ethereum.request({ method: 'eth_accounts' });
				if (accounts.length !== 0) {
					const account = accounts[0];
					console.log('Found an authorized account:', account);
					setCurrentAccount(account);
          setIsLoading(false);
				} else {
					alert('No authorized account found');
          setIsLoading(false);
				}
			}
		} catch (error) {
			console.log(error);
      setIsLoading(false);
		}
	};

  const connectWalletAction = async () => {
		try {
			let ethereum: any;
			ethereum = window.ethereum;

			if (!ethereum) {
				alert('Get MetaMask!');
				return;
			}

			const accounts = await ethereum.request({method: 'eth_requestAccounts'});
			console.log('Connected', accounts[0]);
			setCurrentAccount(accounts[0]);
      setIsLoading(false);
		} catch (error) {
			console.log(error);
      setIsLoading(false);
		}
	};

  //check if the wallet is connected
  useEffect(() => {
    checkIfWalletIsConnected();
    setIsLoading(false);
  }, []);

  //fetch all users
  const fetchAllUsers = async (userManagerContractEther: any) => {
    setIsLoading(true);
    const allUsers = await userManagerContractEther.getAllUsers();
    let userArray: UserModel[] = [];
    allUsers.forEach((user: any) => {
      //filter the deleted instance
      // still remain on  the blockchain with "" for string && 0 for numbers
      if(user.name === "" || user.age.toNumber() === 0 || user.lastName === "") {
        return;
      }

      let fetchedUser: UserModel= {
        id: user.id.toNumber(),
        name: user.name,
        lastName: user.lastName,
        telephoneNumber: user.telephoneNumber.toNumber(),
        email: user.email,
        age: user.age.toNumber(),
        ipfsHash: user.ipfsHash,
        personalLink: user.personalLink,
        tags:user.tags,
      }
      userArray.push(fetchedUser);
    })
    setUserList(userArray);
    setIsLoading(false);
  };

  //get the contract instance
  useEffect(() => {
    let ethereum: any;
    ethereum = window.ethereum;

		if (ethereum) {
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			const userManagerContractEther = new ethers.Contract(USER_MANAGER_CONTRACT_ADDRESS, UserManagerContractABI.abi, signer);
			setUserManagerContract(userManagerContractEther);
      fetchAllUsers(userManagerContractEther);
      setIsLoading(false);
		} else {
			console.log('Ethereum object not found');
      setIsLoading(false);
		}
	}, []);

  //create a user
  const addUserHandler = async (toCreateUser: UserModel) => {
    const {name, lastName, telephoneNumber, email, age, ipfsHash, personalLink, tags } = toCreateUser;
    setIsLoading(true);
    let tx = await userManagerContract.createUser(name, lastName, telephoneNumber, email, age, ipfsHash, personalLink, tags);
    await tx.wait();
    toast.success('User created!');
    setIsLoading(false);
    // change later for events
    fetchAllUsers(userManagerContract);
  };

  const onUpdateUserHandler = async (toUpdateUser: UserModel) => {
    if (toUpdateUser === null) {
      return;
    }
    
    const {id, name, lastName, telephoneNumber, email, age, ipfsHash, personalLink, tags } = toUpdateUser;
    setIsLoading(true);
    let tx = await userManagerContract.updateUser(id, name, lastName, telephoneNumber, email, age, ipfsHash, personalLink, tags);
    await tx.wait();
    toast.success('User Updated!');
    setIsLoading(false);
    // change later for events
    fetchAllUsers(userManagerContract);
  };

  const onDeleteHandler = async (userId: any) => {
    setIsLoading(true);
    let tx = await userManagerContract.deleteUser(userId); 
    await tx.wait();
    toast.success('User deleted!');
    setIsLoading(false);
  }
  
  return (
    <div className="user-manager__main-container">
      <Toaster />
      <h1 className="main-title">User Manager</h1>
      {
        isLoading === false ? 
        (<>
          {
            currentAccount !== null ? 
            <Greetings account={currentAccount}/>
            : 
            <Button 
              onAction={connectWalletAction}
              text={"Connect your wallet 🦊"}
            />
          }
          {
            isCreating === true ?
              <>
                <Button 
                  onAction={creatingHandler}
                  text={"Stop creating ❌"}
                />
                <UserCreation 
                  isEditing={false} 
                  onAddUser={addUserHandler} 
                  title={"Create User"} 
                />
              </>
              :
            <Button 
              onAction={creatingHandler}
              text={"Create a user ✅"}
            />

          }
          <UserList 
            usersList={userList || dummyData}
            deleteUser={onDeleteHandler}
            updateUserHandler={onUpdateUserHandler}
          />
        </>)
          :
        <p className="paragraph-grey"> Loading ...</p>
      }
    </div>
  );
}

export default App;
