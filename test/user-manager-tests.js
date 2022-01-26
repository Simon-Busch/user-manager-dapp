const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UserManager contract test -------------", function () {
  let UserManager;
  let userManagerContract;
  let owner;

  beforeEach(async () => {
    [ owner ] = await ethers.getSigners();
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
    it("First user should have a tag", async function () {
      const userList = await userManagerContract.getAllUsers();
      expect(userList[0].tags).to.equal("solidity");
    });
  });

  describe("User creation", function () {
    it("Should have a user with all properties", async function () {
      await userManagerContract.createUser(
        "bob",
        "bob",
        5454545454,
        "bob@bob.bob",
        22,
        "QmdocV9tSr7qvRe3qmC3J7AwWw4D5pj8gnMPnWrneZjJfD",
        "https://github.com/",
        "worker"
      );
      const user = await userManagerContract.getUser(1) 
      const userList = await userManagerContract.getAllUsers();
      expect(user.id).to.equal(1);
      expect(user.name).to.equal("bob");
      expect(user.lastName).to.equal("bob");
      expect(user.telephoneNumber).to.equal(5454545454);
      expect(user.personalLink).to.equal("https://github.com/");
      expect(user.age).to.equal(22);
      expect(user.ipfsHash).to.equal("QmdocV9tSr7qvRe3qmC3J7AwWw4D5pj8gnMPnWrneZjJfD");
      expect(user.tags).to.equal("worker");
      expect(userList.length).to.equal(2);
    });
    it("User list should have a length of 2 after user creation", async function () {
      await userManagerContract.createUser(
        "bob",
        "bob",
        5454545454,
        "bob@bob.bob",
        22,
        "QmdocV9tSr7qvRe3qmC3J7AwWw4D5pj8gnMPnWrneZjJfD",
        "https://github.com/",
        "worker"
      );
      const userList = await userManagerContract.getAllUsers();
      expect(userList.length).to.equal(2);
    });
  });

  describe("Update a user", function() {
    it("Should be able to update a user", async function () {
      await userManagerContract.updateUser(
        0,
        "jean",
        "jean",
        1212,
        "jean@jean.jean",
        69,
        "QmdocV9tSr7qvRe3qmC3J7AwWw4D5pj8gnMPnWrneZjJfD",
        "https://github.com/Simon-Busch",
        "CEO"
      );
      let user = await userManagerContract.getUser(0);
      expect(user.name).to.equal("jean");
      expect(user.age.toNumber()).to.equal(69);
    });
  });

  describe("Delete a user", function() {
    it("Should be able to delete a user", async function () {
      await userManagerContract.deleteUser(0);
      let user = await userManagerContract.getUser(0);
      expect(user.age).to.equal(0);
    });
  });
});
