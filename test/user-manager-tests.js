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
    it("First user should have a name of type string ", async function () {
      const userList = await userManagerContract.getAllUsers();      
      expect(userList[0].name).to.be.a("string");
    });
    it("First user should have a last name of type string ", async function () {
      const userList = await userManagerContract.getAllUsers();      
      expect(userList[0].lastName).to.be.a("string");
    });
    it("First user should telephone number of type number ", async function () {
      const userList = await userManagerContract.getAllUsers();      
      expect(userList[0].telephoneNumber.toNumber()).to.be.a("number");
    });
    it("First user should have an email of type string ", async function () {
      const userList = await userManagerContract.getAllUsers();      
      expect(userList[0].email).to.be.a("string");
    });
    it("First user should an age of type number ", async function () {
      const userList = await userManagerContract.getAllUsers();      
      expect(userList[0].age.toNumber()).to.be.a("number");
    });
    it("First user should have a ipfs hash of type string ", async function () {
      const userList = await userManagerContract.getAllUsers();      
      expect(userList[0].ipfsHash).to.be.a("string");
    });
    it("First user should have a personnal link of type string ", async function () {
      const userList = await userManagerContract.getAllUsers();      
      expect(userList[0].personalLink).to.be.a("string");
    });
    it("First user should have an array of 1 tag", async function () {
      const userList = await userManagerContract.getAllUsers();
      expect(+userList[0].tags.length).to.equal(1);
    });
  });

  describe("User creation", function () {
    it("Should be able to create a user", async function () {
      await userManagerContract.createUser(
        "bob",
        "bob",
        5454545454,
        "bob@bob.bob",
        22,
        "QmdocV9tSr7qvRe3qmC3J7AwWw4D5pj8gnMPnWrneZjJfD",
        "https://github.com/Simon-Busch",
        "worker"
      );
      const userList = await userManagerContract.getAllUsers();
      expect(userList.length).to.equal(2);
    });
  })


});
