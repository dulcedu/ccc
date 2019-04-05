// solium-disable linebreak-style
pragma solidity ^0.5.0;


import "openzeppelin-solidity/contracts/token/ERC721/ERC721Mintable.sol";

contract AthleteToken is ERC721Mintable {
  uint public passYards;
  uint public rushYards;
  uint public touchdowns;
  uint public pointsPerGame;

  struct Player{
    string playerName;
    string team;
    uint jerseyNumber;
    uint passYards;
    uint rushYards;
    uint touchdowns;
    uint pointsPerGame;
  }

  mapping (uint256 => Player) tokenData;

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
    mint(to, tokenId);
    tokenData[tokenId] = Player(
      playerName,
      team,
      jerseyNumber,
      passYards,
      rushYards,
      touchdowns,
      pointsPerGame
    );
  }
  
  
}