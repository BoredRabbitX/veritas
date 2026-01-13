export const CONTRACT_ADDRESS = "0xb3dc45518cc51c759193da59772a407dad584852";

export const CONTRACT_ABI = [
  "function registerBusiness(string _name, string _category) external",
  "function postReview(address _business, uint8 _rating, string _ipfsContent, bytes32 _receiptId, bytes _signature) external",
  "function getAverageRating(address _business) external view returns (uint256)",
  "function businesses(address) external view returns (string name, string category, bool isActive, uint256 reviewCount)"
];
