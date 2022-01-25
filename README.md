# User Manager Dapp

## Use case
On this application, the user should be able to :
- Create contact
- View contact details 
- Update contact details
- Delete contact

For reference, the user model is the following:
- Name
- Last Name
- Telephone number
- Email
- Age
- Picture/Avatar
- Link to personal website
- Tags

## Stack used
- React
- Typescript
- HTML5/CSS3
- Solidity
- Hardhat

## Installation


```bash
npm i
```

## Get started

```bash
npm start
```

## Requirement
To interract with this Dapp, you will need a MetaMask account set on Rinkeby test network

### Faucet
In addition to MetaMask, you'll need ETH that you can get on various faucet.

| Ethily | [https://ethily.io/rinkeby-faucet/](https://ethily.io/rinkeby-faucet/)

| Official Rinkeby | [https://faucet.rinkeby.io/](https://faucet.rinkeby.io/)

|Other faucet| | [https://faucets.chain.link/rinkeby](https://faucets.chain.link/rinkeby)
## Hardhat

If you do any changes in the SmartContract, first, run the tests:

```bash
npx hardhat test
```
You will also need to create a .env with the following variables:
- URL_INFURA="YOUR INFURA DEPLOYMENT ADDRESS"
- ACCOUNT_PRIVATE="YOUR PRIVATE ACCOUNT KEY FOR METAMASK"

NB: if you want to upload a new smart contract, make sure you take the infura key for Rinkeby development.

### Deploy your smart contract
```bash
npx hardhat run scripts/deploy.js
```

## React | Typescript
### Update needed
Update the component App.tsx to have the new contract address given by the above command.
### Testing
Make sure all tests are running smoothly with the following command:
```bash
npm run test
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
