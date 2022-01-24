const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UserManager contract test -------------", function () {
  let UserManager;
  let userManagerContract;
  let owner;

  beforeEach(async () => {
    [owner ] = await ethers.getSigners();
    UserManager = await ethers.getContractFactory("UserManager");
    userManagerContract = await UserManager.deploy();
    await userManagerContract.deployed();
  })

});
