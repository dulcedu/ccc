// solium-disable linebreak-style
pragma solidity ^0.5.2;

import "./AthleteToken.sol";
import "./ReentrancyGuard.sol";

/**
 * @title Crowdsale
 * @dev Crowdsale is a base contract for managing a token crowdsale,
 * allowing investors to purchase tokens with ether. This contract implements
 * such functionality in its most fundamental form and can be extended to provide additional
 * functionality and/or custom behavior.
 * The external interface represents the basic interface for purchasing tokens, and conform
 * the base architecture for crowdsales. They are *not* intended to be modified / overridden.
 * The internal interface conforms the extensible and modifiable surface of crowdsales. Override
 * the methods to add functionality. Consider using 'super' where appropriate to concatenate
 * behavior.
 */
contract CollectiblesCrowdsale is ReentrancyGuard {
  using SafeMath for uint256;

  // The token being sold
  AthleteToken private _token;

  // Address where funds are collected
  address payable private _wallet;

  // How many token units a buyer gets per wei.
  // The rate is the conversion between wei and the smallest and indivisible token unit.
  // So, if you are using a rate of 1 with a ERC20Detailed token with 3 decimals called TOK
  // 1 wei will give you 1 unit, or 0.001 TOK.
  uint256 private _rate;

  // Amount of wei raised
  uint256 private _weiRaised;

  uint256 private _totalMintedTokens;

  uint256 private _batchSize;

  uint256 private _openingTime;

  uint256 private _closingTime;


  /**
    * Event for token purchase logging
    * @param purchaser who paid for the tokens
    * @param _beneficiary who got the tokens
    * @param value weis paid for purchase
    * @param amount amount of tokens purchased
    */
  event TokensPurchased(
    address indexed purchaser,
    address indexed _beneficiary,
    uint256 value,
    uint256 amount
  );

  /**
    * @dev The rate is the conversion between wei and the smallest and indivisible
    * token unit. So, if you are using a rate of 1 with a ERC20Detailed token
    * with 3 decimals called TOK, 1 wei will give you 1 unit, or 0.001 TOK.
    * @param wallet Address where collected funds will be forwarded to
    * @param token Address of the token being sold
    */
  constructor(
    address payable wallet, 
    AthleteToken token,
    uint256 openingTime, 
    uint256 closingTime
  )
    public 
  {
    require(
      wallet != address(0),
      "CollectiblesCrowdsale constructor : Can't have address zero as a wallet"
    );
    require(
      address(token) != address(0),
      "CollectiblesCrowdsale constructor : Address zero is not a token"
    );

    _rate = 600 szabo;
    _wallet = wallet;
    _token = token;
    _totalMintedTokens = 0;
    _batchSize = 3;
    _openingTime = openingTime;
    _closingTime = closingTime;
  }

   /**
    * @return the token being sold.
    */
  function token() public view returns (AthleteToken) {
    return _token;
  }

  /**
    * @return the address where funds are collected.
    */
  function wallet() public view returns (address payable) {
    return _wallet;
  }

  /**
    * @return the number of token units a buyer gets per wei.
    */
  function rate() public view returns (uint256) {
    return _rate;
  }

  /**
    * @return the amount of wei raised.
    */
  function weiRaised() public view returns (uint256) {
    return _weiRaised;
  }

  /**
    * @return the amount of wei raised.
    */
  function totalMintedTokens() public view returns (uint256) {
    return _totalMintedTokens;
  }

  /**
    * @return the amount of wei raised.
    */
  function batchSize() public view returns (uint256) {
    return _batchSize;
  }

  /**
    * @return the crowdsale opening time.
    */
  function openingTime() public view returns (uint256) {
    return _openingTime;
  }

  /**
    * @return the crowdsale closing time.
    */
  function closingTime() public view returns (uint256) {
    return _closingTime;
  }
  
  /**
    * @dev low level token purchase ***DO NOT OVERRIDE***
    * This function has a non-reentrancy guard, so it shouldn't be called by
    * another `nonReentrant` function.
    * @param _beneficiary Recipient of the token purchase
    */
  function buyTokens(
    address _beneficiary,
    string memory _playerName,
    string memory _birthPlace,
    string memory _birthDate,
    uint _heightCm,
    uint _weightKg,
    string memory _college,
    uint[11] memory _basketballStats
  ) 
  public
  payable
  nonReentrant
  {
    uint256 weiAmount = msg.value;
    _preValidatePurchase(_beneficiary, weiAmount);

    _weiRaised = _weiRaised.add(weiAmount);

    _processPurchase(
      _beneficiary,
      _playerName,
      _birthPlace,
      _birthDate,
      _heightCm,
      _weightKg,
      _college,
      _basketballStats
    );
    emit TokensPurchased(msg.sender, _beneficiary, weiAmount, _batchSize);

    _forwardFunds();
  }

  /**
    * @dev Validation of an incoming purchase. Use require statements to revert state when conditions are not met.
    * Use `super` in contracts that inherit from Crowdsale to extend their validations.
    * Example from CappedCrowdsale.sol's _preValidatePurchase method:
    *     super._preValidatePurchase(_beneficiary, weiAmount);
    *     require(weiRaised().add(weiAmount) <= cap);
    * @param _beneficiary Address performing the token purchase
    * @param weiAmount Value in wei involved in the purchase
    */
  function _preValidatePurchase(address _beneficiary, uint256 weiAmount)
    internal
    view
  {
    require(
      _openingTime <= now,
      "CollectiblesCrowdsale._preValidatePurchase : The crowdsale is not yet open"
    );
    require(
      now <= _closingTime,
      "CollectiblesCrowdsale._preValidatePurchase : The crowdsale is closed"
    );
    require(
      _beneficiary != address(0),
      "Beneficiary must not be address zero"
    );
    require(
      _rate == weiAmount,
      "CollectiblesCrowdasle._preValidatePurchase : You must pay the price of 600 szabo per token"
    );
  }

  /**
    * @dev Executed when a purchase has been validated and is ready to be executed. Doesn't necessarily emit/send
    * tokens.
    * @param _beneficiary Address receiving the tokens
    */
  function _processPurchase(
    address _beneficiary,
    string memory _playerName,
    string memory _birthPlace,
    string memory _birthDate,
    uint _heightCm,
    uint _weightKg,
    string memory _college,
    uint[11] memory _basketballStats
  ) 
    internal 
  {
    _deliverTokens(
      _beneficiary,
      _playerName,
      _birthPlace,
      _birthDate,
      _heightCm,
      _weightKg,
      _college,
      _basketballStats
    );
  }

  /**
    * @dev Source of tokens. Override this method to modify the way in which the crowdsale ultimately gets and sends
    * its tokens.
    * @param _beneficiary Address performing the token purchase
    */
  function _deliverTokens(
    address _beneficiary,
    string memory _playerName,
    string memory _birthPlace,
    string memory _birthDate,
    uint _heightCm,
    uint _weightKg,
    string memory _college,
    uint[11] memory _basketballStats
  ) 
    internal
  {
    uint256 index = _totalMintedTokens;
    uint256 target = _totalMintedTokens+_batchSize;
    for (; index < target; index++) {
      _token.newCard(
        _beneficiary,
        index,
        _playerName,
        _birthPlace,
        _birthDate,
        _heightCm,
        _weightKg,
        _college,
        _basketballStats
      );
    }
    _totalMintedTokens = index;
  }

  /**
    * @dev Determines how ETH is stored/forwarded on purchases.
    */
  function _forwardFunds() internal {
    _wallet.transfer(msg.value);
  }
}
