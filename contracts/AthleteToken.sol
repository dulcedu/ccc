// solium-disable linebreak-style
pragma solidity ^0.5.0;

contract AthleteToken {
  string public name = "Athlete Token";
  string public symbol = "ATH";
  uint public decimals = 2;
  uint public INITIAL_SUPPLY = 255000000 * 10**uint(decimals);
  uint256 public totalSupply_;

  using SafeMath for uint256;

  /**
  * @dev The Ownable constructor sets the original `owner` of the contract to the sender
  * account.
  */
  constructor() 
  public 
  {
    owner = msg.sender;
    totalSupply_ = INITIAL_SUPPLY;
    balances[owner] = INITIAL_SUPPLY;
  }

  mapping(address => uint256) balances;

  /**
  * @dev We use a single lock for the whole contract.
  */
  bool private reentrancyLock = false;

  /**
  * @dev Prevents a contract from calling itself, directly or indirectly.
  * @notice If you mark a function `nonReentrant`, you should also
  * mark it `external`. Calling one nonReentrant function from
  * another is not supported. Instead, you can implement a
  * `private` function doing the actual work, and a `external`
  * wrapper marked as `nonReentrant`.
  */
  modifier nonReentrant() 
  {
    require(!reentrancyLock,"Reentrancy lock is on ;)");
    reentrancyLock = true;
    _;
    reentrancyLock = false;
  }

  /**
  * @dev Total number of tokens in existence
  */
  function totalSupply() 
  public 
  view 
  returns (uint256) 
  {
    return totalSupply_;
  }

  /**
  * @dev Transfer token for a specified address
  * @param _to The address to transfer to.
  * @param _value The amount to be transferred.
  */
  function transfer(
    address _to, 
    uint256 _value
  ) 
  public 
  returns (bool) 
  {
    _transfer(_to, _value);
  }

  function _transfer(
    address _to, 
    uint256 _value
  ) 
  internal
  nonReentrant
  returns (bool) 
  {
    require(_to != address(0));
    require(_value <= balances[msg.sender]);

    balances[msg.sender] = balances[msg.sender].sub(_value);
    balances[_to] = balances[_to].add(_value);
    emit Transfer(msg.sender, _to, _value);
    emit Transfer(msg.sender, msg.sender, _to, _value);
    return true;
  }

  event Transfer(
    address indexed _from, 
    address indexed _to, 
    uint256 value
  );
  event Transfer(
    address indexed _spender,
    address indexed _from,
    address indexed _to,
    uint256 _value
  );

  /**
  * @dev Gets the balance of the specified address.
  * @param _owner The address to query the the balance of.
  * @return An uint256 representing the amount owned by the passed address.
  */
  function balanceOf(
    address _owner
  ) 
  public 
  view 
  returns (uint256) 
  {
    return balances[_owner];
  }

  mapping(address => mapping (address => uint256)) internal allowed;


  /**
  * @dev Transfer tokens from one address to another
  * @param _from address The address which you want to send tokens from
  * @param _to address The address which you want to transfer to
  * @param _value uint256 the amount of tokens to be transferred
  */
  function transferFrom(
    address _from,
    address _to,
    uint256 _value
  )
  public
  returns(bool)
  {
    _transferFrom(_from,_to,_value);
  }

  function _transferFrom(
    address _from,
    address _to,
    uint256 _value
  )
  public
  nonReentrant
  returns(bool)
  {
    require(_to != address(0),"Can't send tokens to the 0x0 address.");
    require(_value <= balances[_from],"Token amount to send must be smaller than the balance you want to send from.");
    require(_value <= allowed[_from][msg.sender],"Token amount to send must be smaller than that you're allowed to send from this address.");

    balances[_from] = balances[_from].sub(_value);
    balances[_to] = balances[_to].add(_value);
    allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
    emit Transfer(_from, _to, _value);
    emit Transfer(msg.sender,_from, _to, _value);
    return true;
  }

  /**
  * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
  * Beware that changing an allowance with this method brings the risk that someone may use both the old
  * and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this
  * race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards:
  * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
  * @param _spender The address which will spend the funds.
  * @param _value The amount of tokens to be spent.
  */
  function approve(
    address _spender, 
    uint256 _currentValue,
    uint256 _value
  ) 
  public 
  returns(bool) 
  {
    require(_currentValue == allowed[msg.sender][_spender]);
    allowed[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    emit Approval(msg.sender, _spender, _currentValue, _value);
    return true;
  }

  event Approval(
    address indexed _owner,
    address indexed _spender,
    uint256 value
  );
  event Approval(
    address indexed _owner,
    address indexed _spender,
    uint256 _oldValue,
    uint256 _value
  );

  /**
  * @dev Function to check the amount of tokens that an owner allowed to a spender.
  * @param _owner address The address which owns the funds.
  * @param _spender address The address which will spend the funds.
  * @return A uint256 specifying the amount of tokens still available for the spender.
  */
  function allowance(
    address _owner,
    address _spender
  )
  public
  view
  returns(uint256)
  {
    return allowed[_owner][_spender];
  }

  /**
  * @dev Increase the amount of tokens that an owner allowed to a spender.
  * approve should be called when allowed[_spender] == 0. To increment
  * allowed value is better to use this function to avoid 2 calls (and wait until
  * the first transaction is mined)
  * From MonolithDAO Token.sol
  * @param _spender The address which will spend the funds.
  * @param _addedValue The amount of tokens to increase the allowance by.
  */
  function increaseApproval(
    address _spender,
    uint256 _addedValue
  )
  public
  returns(bool)
  {
    allowed[msg.sender][_spender] = (
    allowed[msg.sender][_spender].add(_addedValue));
    emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
    return true;
  }

  /**
  * @dev Decrease the amount of tokens that an owner allowed to a spender.
  * approve should be called when allowed[_spender] == 0. To decrement
  * allowed value is better to use this function to avoid 2 calls (and wait until
  * the first transaction is mined)
  * From MonolithDAO Token.sol
  * @param _spender The address which will spend the funds.
  * @param _subtractedValue The amount of tokens to decrease the allowance by.
  */
  function decreaseApproval(
    address _spender,
    uint256 _subtractedValue
  )
  public
  returns(bool)
  {
    uint256 oldValue = allowed[msg.sender][_spender];
    if (_subtractedValue > oldValue) {
      allowed[msg.sender][_spender] = 0;
    } else {
      allowed[msg.sender][_spender] = oldValue.sub(_subtractedValue);
    }
    emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
    return true;
  }

  address public owner;

  event OwnershipRenounced(
    address indexed previousOwner
  );
  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );

  /**
  * @dev Throws if called by any account other than the owner.
  */
  modifier onlyOwner() 
  {
    require(msg.sender == owner);
    _;
  }

  /**
  * @dev Allows the current owner to relinquish control of the contract.
  * @notice Renouncing to ownership will leave the contract without an owner.
  * It will not be possible to call the functions with the `onlyOwner`
  * modifier anymore.
  */
  function renounceOwnership() 
  public 
  onlyOwner 
  {
    emit OwnershipRenounced(owner);
    owner = address(0);
  }

  /**
  * @dev Allows the current owner to transfer control of the contract to a newOwner.
  * @param _newOwner The address to transfer ownership to.
  */
  function transferOwnership(
    address _newOwner
  ) 
  public 
  onlyOwner 
  {
    _transferOwnership(_newOwner);
  }

  /**
  * @dev Transfers control of the contract to a newOwner.
  * @param _newOwner The address to transfer ownership to.
  */
  function _transferOwnership(
    address _newOwner
  ) 
  internal 
  {
    require(_newOwner != address(0));
    emit OwnershipTransferred(owner, _newOwner);
    owner = _newOwner;
  }

  event Mint(address indexed to, uint256 amount);
  event MintFinished();

  bool public mintingFinished = false;


  modifier canMint() 
  {
    require(!mintingFinished);
    _;
  }

  modifier hasMintPermission() 
  {
    require(msg.sender == owner);
    _;
  }

  /**
  * @dev Function to mint tokens
  * @param _to The address that will receive the minted tokens.
  * @param _amount The amount of tokens to mint.
  * @return A boolean that indicates if the operation was successful.
  */
  function mint(
    address _to,
    uint256 _amount
  )
  public
  hasMintPermission canMint
  returns (bool)
  {
    totalSupply_ = totalSupply_.add(_amount);
    balances[_to] = balances[_to].add(_amount);
    emit Mint(_to, _amount);
    emit Transfer(address(0), _to, _amount);
    return true;
  }

  /**
  * @dev Function to stop minting new tokens.
  * @return True if the operation was successful.
  */
  function finishMinting() 
  public  
  onlyOwner canMint
  returns (bool) 
  {
    mintingFinished = true;
    emit MintFinished();
    return true;
  }

  event Burn(address indexed burner, uint256 value);

  /**
  * @dev Burns a specific amount of tokens.
  * @param _value The amount of token to be burned.
  */
  function burn(
    uint256 _value
  ) 
  public 
  {
    _burn(msg.sender, _value);
  }

  function _burn(
    address _who, 
    uint256 _value
  ) 
  internal 
  {
    require(_value <= balances[_who]);
    // no need to require value <= totalSupply, since that would imply the
    // sender's balance is greater than the totalSupply, which *should* be an assertion failure

    balances[_who] = balances[_who].sub(_value);
    totalSupply_ = totalSupply_.sub(_value);
    emit Burn(_who, _value);
    emit Transfer(_who, address(0), _value);
  }
}

  /**
  * @title Math
  * @dev Assorted math operations
  */
  /**
  * @title SafeMath
  * @dev Math operations with safety checks that throw on error
  */
library SafeMath {

  /**
  * @dev Multiplies two numbers, throws on overflow.
  */
  function mul(
    uint256 a, 
    uint256 b
  ) 
  internal 
  pure 
  returns(uint256 c) 
  {
    // Gas optimization: this is cheaper than asserting 'a' not being zero, but the
    // benefit is lost if 'b' is also tested.
    // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
    if (a == 0) {
      return 0;
    }

    c = a * b;
    require(c / a == b,"Multiplication overflows uint256.");
    return c;
  }

  /**
  * @dev Integer division of two numbers, truncating the quotient.
  */
  function div(
    uint256 a,
    uint256 b
  ) 
  internal 
  pure 
  returns(uint256) 
  {
    // assert(b > 0); 
    // Solidity automatically throws when dividing by 0
    // uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return a / b;
  }

  /**
  * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
  */
  function sub(
    uint256 minuend, 
    uint256 subtrahend
  ) 
  internal 
  pure 
  returns(uint256) 
  {
    require(minuend >= subtrahend,"Subtrahend is greater than minuend.");
    return minuend - subtrahend;
  }

  /**
  * @dev Adds two numbers, throws on overflow.
  */
  function add(
    uint256 a, 
    uint256 b
  ) 
  internal 
  pure 
  returns(uint256 c) 
  {
    c = a + b;
    require(c >= a,"Addition overflows uint256.");
    return c;
  }
}