// solium-disable linebreak-style
pragma solidity ^0.5.2;

import "./ERC721Mintable.sol";

contract AthleteToken is ERC721Mintable {

  mapping (uint256 => bytes32[6]) public playerData;

  mapping (uint256 => uint[11]) public basketballStats;

  mapping (uint256 => string) public designURL;

  // lock time. time-tiered transactions
  function newCard(
    address _to,
    uint256 _tokenId,

    bytes32[6] memory _playerData,
    // string memory _playerName,
    // string memory _birthPlace,
    // string memory _birthDate,
    // string memory _heightCm,
    // string memory _weightKg,
    // string memory _college,

    /** 
    * Puting data into arrays are the most optimal way 
    * to make functions that require a lot of parameters
    */
    uint[11] memory _basketballStats,
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

    string memory _designURL
  )
    public
  {
    mint(_to, _tokenId);

    playerData[_tokenId] = _playerData;
    //basketballStats[_tokenId] = [
    //   _playerName,
    //   _birthPlace,
    //   _birthDate,
    //   _heightCm,
    //   _weightKg,
    //   _college,
    // ];
    
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

    designURL[_tokenId] = _designURL;
  }

}