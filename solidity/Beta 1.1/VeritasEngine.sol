// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract VeritasEngine {
    mapping(bytes32 => address) public receiptIssuers;
    mapping(bytes32 => string) public merchantReplies;

    event ReceiptIssued(address indexed merchant, bytes32 indexed receiptHash);
    event ReplyPosted(bytes32 indexed receiptId, string content);

    function issueReceipt(bytes32 _receiptHash) external {
        require(receiptIssuers[_receiptHash] == address(0), "Receipt exists");
        receiptIssuers[_receiptHash] = msg.sender;
        emit ReceiptIssued(msg.sender, _receiptHash);
    }

    function postReply(bytes32 _receiptId, string calldata _content) external {
        require(receiptIssuers[_receiptId] == msg.sender, "Not your receipt");
        merchantReplies[_receiptId] = _content;
        emit ReplyPosted(_receiptId, _content);
    }
}
