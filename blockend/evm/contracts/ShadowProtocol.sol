// SPDX:License-Identifier: MIT

pragma solidity ^0.8.0;


// Functionalities

// 1. User locks his NFT in this vault. Which mints the NFT in the secret network. where he can own, lend or fractionalize it privately.
// 2. User can make a transaction to retreive the NFT back to EVM network if he owns the NFT completely or can own a fraction.

// 1. lockNFT
// 2. retreiveNFT
// 3. retreiveNFTFraction

import "./interface/IShadows.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Create2.sol";

error NftNotApproved(address nftContract, uint256 tokenId);
error NftAlreadyFractionalized(address nftContract, uint256 tokenId);
error NftNotFractionalized(address nftContract, uint256 tokenId);
error InvalidFractions(address nftContract, address caller, uint256 tokenId,  uint256 fractions);

contract ShadowProtocol{

    mapping(address=>mapping(uint256=>bool)) public nftFractionalized;
    IShadows public shadows;

    constructor(address _shadowsImplementation) 
    {
        shadows = IShadows(_deployProxy(_shadowsImplementation, 0));
    }

    function fractionalizeNftToSecret(address _nftContract, uint256 _tokenId, uint256 _fractions, string memory _fractionUri) external {
        
        if(IERC721(_nftContract).getApproved(_tokenId)!=address(this)) revert NftNotApproved(_nftContract, _tokenId);
        
        if(nftFractionalized[_nftContract][_tokenId]) revert NftAlreadyFractionalized(_nftContract, _tokenId);

        IERC721(_nftContract).transferFrom(msg.sender, address(this), _tokenId);
        nftFractionalized[_nftContract][_tokenId] = true;
        shadows.initNft(_nftContract, _tokenId, _fractions, _fractionUri);
        
        // Mint fractions in Secret
    }

    function _mintFractionsInEvm(address _nftContract, uint256 _tokenId, address receiver, uint256 _fractions) internal {
        if(!nftFractionalized[_nftContract][_tokenId]) revert NftNotFractionalized(_nftContract, _tokenId);
        shadows.mintFractions(_receiver, _tokenAddress, _tokenId, _fractions);
    }
    

    function sendSharesToSecret(address _nftContract, uint256 _tokenId, uint256 _fractions) external {
        if(shadows.getFractions(msg.sender, _nftContract, _tokenId) < _fractions) revert InvalidFractions(_nftContract, msg.sender, _tokenId, _fractions);      
        shadows.burnFractions(msg.sender, _nftContract, _tokenId, _fractions);

        // send the fractions to the secret network
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