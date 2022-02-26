const hre = require("hardhat");

async function main() {
  const UserManager = await hre.ethers.getContractFactory("UserManager");
  const userManagerContract = await UserManager.deploy();

  await userManagerContract.deployed();
  console.log("userManager deployed to:", userManagerContract.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
