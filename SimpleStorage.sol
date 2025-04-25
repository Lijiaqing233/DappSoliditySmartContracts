// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleStorage {

    uint256 _favoriteNumber;

    // This is a comment!
    struct People {
        uint256 favoriteNumber;
        string name;
    }

    People[] public people;
    mapping(string => uint256) public nameToFavoriteNumber;

    function store(uint256 favoriteNumber) public {
        _favoriteNumber = favoriteNumber;
    }

    function retrieve() public view returns (uint256){
        return _favoriteNumber;
    }

    function addPerson(string memory name, uint256 favoriteNumber) public {
        people.push(People(favoriteNumber, name));
        nameToFavoriteNumber[name] = favoriteNumber;
    }
}