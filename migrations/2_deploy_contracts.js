
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
  let { ZionWilson, CamReddish, NassirLittle, RJBarrett } = require('./Players.js')(accounts)

  // let gasCost = await CC.buyTokens.estimateGas(...ZionWilson, valueToSend)

  await CC.TokensPurchased().once('data', event => console.log(event))

  ZionWilson[1] = ZionWilson[1].map(web3.utils.utf8ToHex)
  await CC.buyTokens(...ZionWilson, valueToSend)
  CamReddish[1] = CamReddish[1].map(web3.utils.utf8ToHex)
  await CC.buyTokens(...CamReddish, valueToSend)
  NassirLittle[1] = NassirLittle[1].map(web3.utils.utf8ToHex)
  await CC.buyTokens(...NassirLittle, valueToSend)
  RJBarrett[1] = RJBarrett[1].map(web3.utils.utf8ToHex)
  await CC.buyTokens(...RJBarrett, valueToSend)
    // .on('transactionHash', console.log)
    // .on('receipt', console.log)
    // .on('error', console.log)
    // .on('confirmation', console.log)
}
