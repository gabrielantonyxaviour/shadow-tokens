// SPDX:License-Identifier: MIT

pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "./interface/IShadows.sol";

contract Shadows is ERC1155, ERC1155URIStorage, IShadows {

    bool public initialized;
    address public shadowProtocol;

    mapping(uint256=>bool) public tokenIdExists;

    constructor() ERC1155("") {
        initialized = true;
    }

    modifier isInitialized(){
        require(initialized, "Shadows: Contract is not initialized");
        _;
    }
    
    modifier onlyProtocol(){
        require(msg.sender==shadowProtocol, "Shadows: Only protocol can call this function");
        _;
    }

    function initialize(address _protocol) public  {
        require(!initialized, "Shadows: Contract is already initialized");
        shadowProtocol=_protocol;   
        initialized = true;
    }

    function initNft(address _tokenAddress, uint256 _tokenId, uint256 _fractions, string memory _uri) public onlyProtocol isInitialized{
        uint256 _genTokenId=uint256(keccak256(abi.encodePacked(_tokenAddress, _tokenId)));
        require(!tokenIdExists[_genTokenId], "Shadows: Token already exists");
        _mint(msg.sender, _genTokenId, _fractions, "");
        _setURI(_tokenId, _uri);
    }

    function mintFractions(address _receiver, address _tokenAddress, uint256 _tokenId, uint256 _fractions) public onlyProtocol isInitialized{
        uint256 _genTokenId=uint256(keccak256(abi.encodePacked(_tokenAddress, _tokenId)));
        require(tokenIdExists[_genTokenId], "Shadows: Token does not exist");
        
        _safeTransferFrom(msg.sender, _receiver, _genTokenId, _fractions, "");
    }

    function burnFractions(address _burner, address _tokenAddress, uint256 _tokenId, uint256 _fractions) public onlyProtocol isInitialized{
        // check that the token is approved to protocol in the protocol contract 

        uint256 _genTokenId=uint256(keccak256(abi.encodePacked(_tokenAddress, _tokenId)));
        require(tokenIdExists[_genTokenId], "Shadows: Token does not exist");
        
        _safeTransferFrom(_burner, msg.sender, _genTokenId, _fractions, "");
    }

    function uri(uint256 tokenId) public view virtual override(ERC1155, ERC1155URIStorage) returns (string memory) {
        return ERC1155URIStorage.uri(tokenId);
    }
}