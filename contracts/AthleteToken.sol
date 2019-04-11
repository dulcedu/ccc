// solium-disable linebreak-style
pragma solidity ^0.5.0;

import "./ERC721Mintable.sol";

contract AthleteToken is ERC721Mintable {

  mapping (uint256 => string) public playerName;
  mapping (uint256 => string) public birthPlace;
  mapping (uint256 => string) public birthDate;

  mapping (uint256 => uint) public heightCm;
  mapping (uint256 => uint) public weightKg;

  mapping (uint256 => string) public college;
  mapping (uint256 => uint[11]) public basketballStats;

  // lock time. time-tiered transactions
  function newCard(
    address _to,
    uint256 _tokenId,
    string memory _playerName,
    string memory _birthPlace,
    string memory _birthDate,
    uint _heightCm,
    uint _weightKg,
    string memory _college,

    /** 
    * Puting data into arrays are the most optimal way 
    * to make functions that require a lot of parameters
    */
    uint[11] memory _basketballStats
    // uint _gamesPlayed,
    // uint _gamesStarted,
    // uint _minutesPerGame,
    // uint _fieldGoalPercentage,
    // uint _threePointFieldGoalPercentage, 
    // uint _freeThrowPercentage,
    // uint _reboundsPerGame,
    // uint _assistsPerGame, 
    // uint _stealsPerGame,
    // uint _blocksPerGame,
    // uint _pointsPerGame
  )
  public
  {
    mint(_to, _tokenId);

    playerName[_tokenId] = _playerName;
    birthPlace[_tokenId] = _birthPlace;
    birthDate[_tokenId] = _birthDate;
    
    heightCm[_tokenId] = _heightCm;
    weightKg[_tokenId] = _weightKg;

    college[_tokenId] = _college;
    
    basketballStats[_tokenId] = _basketballStats;
    //basketballStats[_tokenId] = [
    //   _gamesPlayed,
    //   _gamesStarted,
    //   _minutesPerGame,
    //   _fieldGoalPercentage,
    //   _threePointFieldGoalPercentage,
    //   _freeThrowPercentage,
    //   _reboundsPerGame,
    //   _assistsPerGame,
    //   _stealsPerGame,
    //   _blocksPerGame,
    //   _pointsPerGame
    // ];
  }

}