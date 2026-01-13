// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Veritas {
    struct Business {
        string name;
        string category;
        bool isActive;
    }

    mapping(address => Business) public businesses;
    mapping(bytes32 => bool) public validReceipts; // Codici emessi dal Merchant
    mapping(bytes32 => bool) public usedReceipts;  // Codici già usati per una recensione

    event BusinessRegistered(address indexed owner, string name);
    event ReceiptIssued(address indexed business, bytes32 indexed receiptHash);
    event ReviewAdded(address indexed business, address indexed author, uint8 rating, string content);

    function registerBusiness(string calldata _name, string calldata _category) external {
        businesses[msg.sender] = Business(_name, _category, true);
        emit BusinessRegistered(msg.sender, _name);
    }

    // THE MERCHANT REGISTERS THE CODE BEFORE GIVING IT TO THE CUSTOMER
    function issueReceipt(bytes32 _receiptHash) external {
        require(businesses[msg.sender].isActive, "Merchant not registered");
        validReceipts[_receiptHash] = true;
        emit ReceiptIssued(msg.sender, _receiptHash);
    }

    function postReview(
        address _business,
        string calldata _customerName,
        uint8 _rating,
        string calldata _content,
        bytes32 _receiptId
    ) external {
        require(businesses[_business].isActive, "Business not registered");
        require(validReceipts[_receiptId], "Invalid Receipt: Not issued by merchant");
        require(!usedReceipts[_receiptId], "Receipt already used");
        require(_rating >= 1 && _rating <= 5, "Rating 1-5");
        require(msg.sender != _business, "Self-review blocked");

        usedReceipts[_receiptId] = true;
        // In this lightweight model we emit an event with all the data (including the name)
        emit ReviewAdded(_business, msg.sender, _rating, string(abi.encodePacked(_customerName, ": ", _content)));
    }
}
