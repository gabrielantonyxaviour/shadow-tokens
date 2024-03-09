// SPDX:License-Identifier: MIT

pragma solidity ^0.8.0;


// Functionalities

// 1. User locks his NFT in this vault. Which mints the NFT in the secret network. where he can own, lend or fractionalize it privately.
// 2. User can make a transaction to retreive the NFT back to EVM network if he owns the NFT completely or can own a fraction.

// 1. lockNFT
// 2. retreiveNFT
// 3. retreiveNFTFraction

import "./interface/IShadows.sol";
import "@openzeppelin/contracts/utils/Create2.sol";

contract ShadowProtocol{

    mapping(address=>mapping(uint256=>address)) public nftToVauilts;

    IShadows public shadows;

    constructor(address _shadowsImplementation) 
    {
        shadows = IShadows(_deployProxy(_shadowsImplementation, 0));
    }



    function fractionalizeNftToSecret(address _nftContract, uint256 _tokenId) public {
        // locks the NFT here
    }

    function mintFractionsInEvm(address _nftContract, uint256 _tokenId) public {
        // mint the shares in the EVM network
    }
    

    function sendSharesToSecret(address _nftContract, uint256 _tokenId, uint256 _shares) public {
        // send the shares to the secret network
    }

 function _deployProxy(
        address implementation,
        uint salt
    ) internal returns (address _contractAddress) {
        bytes memory code = _creationCode(implementation, salt);
        _contractAddress = Create2.computeAddress(
            bytes32(salt),
            keccak256(code)
        );
        if (_contractAddress.code.length != 0) return _contractAddress;

        _contractAddress = Create2.deploy(0, bytes32(salt), code);
    }

    function _creationCode(
        address implementation_,
        uint256 salt_
    ) internal pure returns (bytes memory) {
        return
            abi.encodePacked(
                hex"3d60ad80600a3d3981f3363d3d373d3d3d363d73",
                implementation_,
                hex"5af43d82803e903d91602b57fd5bf3",
                abi.encode(salt_)
            );
    }
}