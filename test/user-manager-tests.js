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
  });

  describe("Test of contract seeding", function () {
    it("Should have 1 user once the contrat is created", async function () {
      const userList = await userManagerContract.getAllUsers(); 
      expect(userList.length).to.equal(1);
    });
    it("First user should have an ID of 0", async function () {
      const userList = await userManagerContract.getAllUsers(); 
      expect(+userList[0].id).to.equal(0);
    });
    it("First user should have an array of 1 tag", async function () {
      const userList = await userManagerContract.getAllUsers();
      expect(+userList[0].tags.length).to.equal(1);
    });
    it("First user should name of type string ", async function () {
      const userList = await userManagerContract.getAllUsers();      
      expect(userList[0].name).to.be.a("string");
    });
    it("First user should telephone number of type number ", async function () {
      const userList = await userManagerContract.getAllUsers();      
      expect(userList[0].telephoneNumber.toNumber()).to.be.a("number");
    });
  })
});
