// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract RoloPunksNFT is ERC721, Ownable {

  uint256 public mintPrice;
  uint256 public totalSupply;
  uint256 public maxSupply;
  uint256 public maxPerWallet;
  bool public isPublicMintEnable;
  string internal baseTokenUri;
  address payable public withdrawalWallet;
  mapping(address => uint256) public walletMints;

  constructor() payable ERC721('RoloPunks', 'ROLO'){
    mintPrice = 0.02 ether;
    totalSupply = 0;
    maxSupply = 1000;
    maxPerWallet = 10;
    // set withdraw wallet address
  }

  function setIsPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner {
    isPublicMintEnable = _isPublicMintEnabled;
  }

  function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
    baseTokenUri = _baseTokenUri;
  }

  function tokenURI(uint256 _tokenId) public view override returns(string memory) {
    require(_exists(_tokenId), 'Token does not exist');
    return string(abi.encodePacked(baseTokenUri, Strings.toString(_tokenId), ".json"));
  }
 
  function withdraw() external onlyOwner {
    (bool success, ) = withdrawalWallet.call{value: address(this).balance}('');
    require(success, 'Wallet is not set');
  }

  function mint(uint _quantity) public payable {
    require(isPublicMintEnable, 'Public mint is disabled');
    require(msg.value == _quantity * mintPrice, 'Mint price is not correct');
    require(totalSupply + _quantity <= maxSupply, 'Sold Out');
    require(walletMints[msg.sender] + _quantity <= maxPerWallet, 'Max per wallet');

    for(uint256 i = 0; i < _quantity; i++) {
      uint256 tokenId = totalSupply + i;
      totalSupply++;
      _safeMint(msg.sender, tokenId);
    }
  }

}

