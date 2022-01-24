//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract UserManager {
    struct User {
        uint id;
        string name;
        string lastName;
        uint telephoneNumber;
        string email;
        uint age;
        string ipfsHash;
        string[] tags;
    }


    User public user;
    User[] public users;

    uint public userId;

    constructor() {
        userId = 0;
    }

    function getAllUsers() external view returns (User[] memory) {
        return users;
    }

    function getUser(uint _id) public view returns(User memory) {
        return users[_id];
    }

    function createUser(string memory _name, string memory _lastName, uint _telephoneNumber, string memory  _email, uint  _age, string memory _ipfsHash, string memory _tag) public {
        User memory newUser = User({
            id: userId,
            name: _name,
            lastName: _lastName,
            telephoneNumber: _telephoneNumber,
            email: _email,
            age: _age,
            ipfsHash: _ipfsHash,
            tags: new string[](0)
        });

        users.push(newUser);
        users[users.length-1].tags.push(_tag);
    }

    function updateUser(uint id, string memory _name, string memory _lastName, uint _telephoneNumber, string memory  _email, uint  _age, string memory _ipfsHash, string[] memory _tag) public {
        users[id].name = _name;
        users[id].lastName = _lastName;
        users[id].telephoneNumber = _telephoneNumber;
        users[id].email = _email;
        users[id].age = _age;
        users[id].ipfsHash = _ipfsHash;
        users[id].tags = _tag;
    }

    function deleteUser(uint _id) public {
        delete users[id];
    }
}
