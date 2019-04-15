
const AthleteToken = artifacts.require('AthleteToken')
const CollectiblesCrowdsale = artifacts.require('CollectiblesCrowdsale')

module.exports = async (deployer, network, accounts) => {
  
  await deployer.deploy(AthleteToken, 'College Collectible Cards', 'CCC')

  let AT = await AthleteToken.deployed()

  let now = Date.UTC(1970, 0, 1, 0, 0, 0)
  console.log(now,new Date(now).toLocaleString('en-GB', { timeZone: 'GMT' }))

  await deployer.deploy(
    CollectiblesCrowdsale,
    accounts[1],
    AT.address,
    now,
    Date.parse('Mon, 15 Apr 2019 23:30:00 GMT')
  )

  let CC = await CollectiblesCrowdsale.deployed()

  await AT.addMinter(CC.address)
  let valueToSend = {
    value: 600 * (10 ** 12)
  }
  // let value = await CC.valueReceived(valueToSend);
  // console.log(value)
  let { ZionWilson, CamRedish, NassirLittle, RJBarrett } = require('./Players.js')(accounts)

  let gasCost = await CC.buyTokens.estimateGas(...ZionWilson, valueToSend)

  await CC.TokensPurchased().once('data', event => console.log(event))

  await CC.buyTokens(...ZionWilson, valueToSend)
  await CC.buyTokens(...CamRedish, valueToSend)
  await CC.buyTokens(...NassirLittle, valueToSend)
  await CC.buyTokens(...RJBarrett, valueToSend)
    // .on('transactionHash', console.log)
    // .on('receipt', console.log)
    // .on('error', console.log)
    // .on('confirmation', console.log)
    
}
