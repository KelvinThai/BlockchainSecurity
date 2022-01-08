//SPDX-License-Identifier: UNLICENSED
pragma solidity <=0.8.10;

import "openzeppelin-solidity/contracts/utils/Context.sol";
import "openzeppelin-solidity/contracts/utils/Counters.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/utils/SafeERC20.sol";
import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";

contract Hero is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;

    constructor() ERC721("Stickman Hero", "Hero") {}

    function _baseURI()
        internal
        pure
        override
        returns (string memory _newBaseURI)
    {
        return "https://heros.stickman.io/";
    }

    function mint(address _to) external onlyOwner returns (uint256) {
        require(balanceOf(_to)==0,"One address only have one Hero");
        uint256 token_id = _tokenIdTracker.current();
        _mint(_to, token_id);
        _tokenIdTracker.increment();
        return token_id;
    }

    function listTokenIds(address owner)external view returns (uint256[] memory tokenIds){
        uint balance = balanceOf(owner);
        uint256[] memory ids = new uint256[](balance);
       
        for( uint i = 0;i<balance;i++)
        {
            ids[i]=tokenOfOwnerByIndex(owner,i);
        }
        return (ids);
    } 
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        require(balanceOf(to)<=1,"One address only have one Hero");
        _transfer(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        require(balanceOf(to)==0,"One address only have one Hero");
        _safeTransfer(from, to, tokenId, _data);
    }
    
}
