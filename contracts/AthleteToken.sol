// solium-disable linebreak-style
pragma solidity ^0.5.0;


import "openzeppelin-solidity/contracts/token/ERC721/ERC721Mintable.sol";

contract AthleteToken is ERC721Mintable {

  mapping (uint256 => uint) public JerseyNumber;
  mapping (uint256 => uint) public PassYards;
  mapping (uint256 => uint) public RushYards;
  mapping (uint256 => uint) public Touchdowns;
  mapping (uint256 => uint) public PointsPerGame;

  function newCard(
    address to,
    uint256 tokenId,
    string memory playerName,
    string memory team,
    uint jerseyNumber,
    uint passYards,
    uint rushYards,
    uint touchdowns,
    uint pointsPerGame
  )
  public
  {
    JerseyNumber[tokenId] = jerseyNumber;
    PassYards[tokenId] = passYards;
    RushYards[tokenId] = rushYards;
    Touchdowns[tokenId] = touchdowns;
    PointsPerGame[tokenId] = pointsPerGame;
  }
 
}