// SPDX:License-Identifier: MIT

pragma solidity ^0.8.0;



interface IShadows{

    function initNft(address _tokenAddress, uint256 _tokenId, uint256 _fractions, string memory _uri) external;
    function mintFractions(address _receiver, address _tokenAddress, uint256 _tokenId, uint256 _fractions) external;
    function burnFractions(address _burner, address _tokenAddress, uint256 _tokenId, uint256 _fractions) external;
    
}