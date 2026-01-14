// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IRegistry { function incrementVolume(address) external; }
interface IEngine { function receiptIssuers(bytes32) external view returns (address); }

contract VeritasReviewer {
    IRegistry public registry;
    IEngine public engine;
    mapping(bytes32 => bool) public usedReceipts;

    event ReviewSubmitted(
        address indexed business, 
        address indexed author, 
        uint8 rating, 
        string content, 
        string ipfsHash, 
        bytes32 receiptId
    );

    constructor(address _registry, address _engine) {
        registry = IRegistry(_registry);
        engine = IEngine(_engine);
    }

    function submitReview(
        address _business, 
        uint8 _rating, 
        string calldata _content, 
        string calldata _ipfsHash, 
        bytes32 _receiptId
    ) external {
        require(engine.receiptIssuers(_receiptId) == _business, "Invalid Receipt For Business");
        require(!usedReceipts[_receiptId], "Receipt Already Used");
        require(_rating > 0 && _rating < 6, "Invalid Rating");
        
        usedReceipts[_receiptId] = true;
        registry.incrementVolume(_business);
        
        emit ReviewSubmitted(_business, msg.sender, _rating, _content, _ipfsHash, _receiptId);
    }
}
