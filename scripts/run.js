// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const UserManager = await hre.ethers.getContractFactory("UserManager");
  const userManagerContract = await UserManager.deploy();

  await userManagerContract.deployed();
  console.log("userManager deployed to:", userManagerContract.address);
  
  let userList;
  userList = await userManagerContract.getAllUsers();
  // console.log(userList);
  
  let firstUser = await userManagerContract.getUser(0);
  console.log(firstUser);
  
  await userManagerContract.createUser(
    "bob",
    "bob",
    5454545454,
    "bob@bob.bob",
    22,
    "QmdocV9tSr7qvRe3qmC3J7AwWw4D5pj8gnMPnWrneZjJfD",
    "google.com",
    "worker"
  );

  let secondUser
  secondUser = await userManagerContract.getUser(1);
  console.log(secondUser);

  await userManagerContract.updateUser(
    1,
    "jean",
    "jean",
    1212,
    "jean@jean.jean",
    69,
    "fdfsdfds",
    "gitrhub.com",
    "CEO"
  )

  await userManagerContract.deleteUser(0);

  userList = await userManagerContract.getAllUsers();
  console.log(userList);



}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
