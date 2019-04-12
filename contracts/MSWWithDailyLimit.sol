pragma solidity ^0.5.2;

import "./MultiSigWallet.sol";

/// @title Multisignature wallet with daily limit - Allows an owner to withdraw a daily limit without multisig.
/// @author Stefan George - <stefan.george@consensys.net>
contract MSWWithDailyLimit is MultiSigWallet {
  event DailyLimitChange(uint dailyLimit);

  uint public dailyLimit;
  uint public lastDay;
  uint public spentToday;

  /*
     * Public functions
     */
  /// @dev Contract constructor sets initial owners, required number of confirmations and daily withdraw limit.
  /// @param _owners List of initial owners.
  /// @param _required Number of required confirmations.
  /// @param _dailyLimit Amount in wei, which can be withdrawn without confirmations on a daily basis.
  constructor(
    address[] memory _owners,
    uint _required,
    uint _dailyLimit
  ) public MultiSigWallet(_owners, _required) {
    dailyLimit = _dailyLimit;
  }

  /// @dev Allows to change the daily limit. Transaction has to be sent by wallet.
  /// @param _dailyLimit Amount in wei.
  function changeDailyLimit(uint _dailyLimit) public onlyWallet {
    dailyLimit = _dailyLimit;
    emit DailyLimitChange(_dailyLimit);
  }

  /// @dev Allows anyone to execute a confirmed transaction or ether withdraws until daily limit is reached.
  /// @param transactionId Transaction ID.
  function executeTransaction(uint transactionId)
    public
    payable
    notExecuted(transactionId)
  {     
    Transaction storage transaction = transactions[transactionId];
    bool confirmed = isConfirmed(transactionId);
    if (confirmed || msg.data.length == 0 && isUnderLimit(msg.value)) {
      transaction.executed = true;
      if (!confirmed) 
        spentToday += msg.value;
      // if (tx.destination.call.value(tx.value)(tx.data)) 
      uint256 firstBalance = transaction.destination.balance;
      transaction.destination.transfer(msg.value);
      uint256 endBalance = transaction.destination.balance;
      if(firstBalance < endBalance)
        emit Execution(transactionId);
      else {
        emit ExecutionFailure(transactionId);
        transaction.executed = false;
        if (!confirmed) 
          spentToday -= msg.value;
      }
    }
  }

  /*
     * Internal functions
     */
  /// @dev Returns if amount is within daily limit and resets spentToday after one day.
  /// @param amount Amount to withdraw.
  /// @return Returns if amount is under daily limit.
  function isUnderLimit(uint amount) internal returns (bool) {
    if (now > lastDay + 24 hours) {
      lastDay = now;
      spentToday = 0;
    }
    if (spentToday + amount > dailyLimit || spentToday + amount < spentToday) return false;
    return true;
  }

  /*
     * Web3 call functions
     */
  /// @dev Returns maximum withdraw amount.
  /// @return Returns amount.
  function calcMaxWithdraw() public view returns (uint) {
    if (now > lastDay + 24 hours) return dailyLimit;
    if (dailyLimit < spentToday) return 0;
    return dailyLimit - spentToday;
  }
}