import React, {useState, useEffect} from 'react';
import './App.css';
import UserList from './components/UserList/UserList';
import Greetings from './components/Greetings/Greetings';
import Button from './components/UI/Button/Button';
import { UserModel } from './model/User.model';
declare let window: any;

const dummyData: UserModel[] = [{
  id: 1,
  name: "Simon",
  lastName: "Busch",
  telephoneNumber: 123456789,
  email: "simon@simon.com",
  age: 32,
  ipfsHash: "QmdocV9tSr7qvRe3qmC3J7AwWw4D5pj8gnMPnWrneZjJfD",
  personalLink: "https://github.com/Simon-Busch",
  tags:['frontend engineer', 'blockchain dev', 'solidity lover'],
}]

const App: React.FC = () => {
  const [ currentAccount, setCurrentAccount ] = useState<string | null>(null);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const USER_MANAGER_CONTRACT_ADDRESS:string = "0x5FA0A3AB6744ac45322a1f5ff0649BE27b38D3c2";

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

  useEffect(() => {
    checkIfWalletIsConnected();
    setIsLoading(false);
  }, []);
  
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
          <UserList 
            usersList={dummyData}
          />
        </>
          :
        <p className="paragraph-grey"> Loading ...</p>
      }
    </div>
  );
}

export default App;
