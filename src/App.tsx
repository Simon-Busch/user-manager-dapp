import React, {useState, useEffect} from 'react';
import './App.css';
import {ethers} from 'ethers';
import UserList from './components/UserList/UserList';
import Greetings from './components/Greetings/Greetings';
import Button from './components/UI/Button/Button';
import UserCreation from './components/UserCreation/UserCreation'
import { UserModel } from './model/User.model';
import UserManagerContractABI from "./artifacts/contracts/UserManager.sol/UserManager.json";
declare let window: any;

const dummyData: UserModel[] = [{
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
  const [ createdUser, setCreatedUser ] = useState<UserModel | null>(null);
  const [ userList, setUserList ] = useState<UserModel[] | null>(null);
  const USER_MANAGER_CONTRACT_ADDRESS:string = "0x79f11f932868613D43216497eF103FD41F55c5f4";

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
				console.log('We have the ethereum object', ethereum, "Connected to chain " + chainId);

        const rinkebyChainId = "0x4"; 
        if (chainId !== rinkebyChainId) {
          alert("You are not connected to the Rinkeby Test Network!");
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
					console.log('No authorized account found');
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

  const fetchAllUsers = async (userManagerContractEther: any) => {
    setIsLoading(true);
    const allUsers = await userManagerContractEther.getAllUsers();
    let userArray: UserModel[] = [];
    allUsers.forEach((user: any) => {
      let fetchedUser: UserModel= {
        id: user.id,
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
      console.log(userManagerContract);
      fetchAllUsers(userManagerContractEther);
      setIsLoading(false);
		} else {
			console.log('Ethereum object not found');
      setIsLoading(false);
		}
	}, []);


  //get all users
  // useEffect(() => {
  //   console.log('rendering')
    
  //   fetchAllUsers();
  // }, [userManagerContract])

  const addUserHandler = async (toCreateUser: UserModel) => {
    // setCreatedUser(toCreateUser);
    const {name, lastName, telephoneNumber, email, age, ipfsHash, personalLink, tags } = toCreateUser;
    console.log(name, lastName, telephoneNumber, email, age, ipfsHash, personalLink, tags)
    setIsLoading(true);
    await userManagerContract.createUser(name, lastName, telephoneNumber, email, age, ipfsHash, personalLink, tags);
    setIsLoading(false);
  };
  
  return (
    <div className="user-manager__main-container">
      <h1 className="main-title">User Manager</h1>
      {
        isLoading === false ? 
        <>
          {
            currentAccount !== null ? 
            <Greetings account={currentAccount}/>
            : 
            <Button 
              onAction={connectWalletAction}
              text={"Connect your wallet 🦊"}
            />
          }
          <UserCreation onAddUser={addUserHandler} />
          <UserList 
            usersList={userList || dummyData}
          />
        </>
          :
        <p className="paragraph-grey"> Loading ...</p>
      }
    </div>
  );
}

export default App;
