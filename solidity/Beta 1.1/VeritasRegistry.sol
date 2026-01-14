// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract VeritasRegistry {
    struct Business {
        string name;
        bytes32 category;
        bool isActive;
        uint32 volume;
    }

    address public owner;
    mapping(address => Business) public businesses;
    mapping(address => bool) public isAuthorized;

    event BusinessRegistered(address indexed owner, string name, bytes32 category);
    event VolumeUpdated(address indexed business, uint32 newVolume);

    modifier onlyOwner() { require(msg.sender == owner, "Not owner"); _; }
    modifier onlyAuth() { require(isAuthorized[msg.sender] || msg.sender == owner, "Not authorized"); _; }

    constructor() { owner = msg.sender; }

    function setAuth(address _contract, bool _status) external onlyOwner {
        isAuthorized[_contract] = _status;
    }

    function registerBusiness(string memory _name, bytes32 _category) external {
        require(!businesses[msg.sender].isActive, "Already registered");
        businesses[msg.sender] = Business(_name, _category, true, 0);
        emit BusinessRegistered(msg.sender, _name, _category);
    }

    function incrementVolume(address _business) external onlyAuth {
        if (businesses[_business].isActive) {
            businesses[_business].volume++;
            emit VolumeUpdated(_business, businesses[_business].volume);
        }
    }
}
