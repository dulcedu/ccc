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

  let ZionWilson = [
    /** to */ accounts[0],
    /** name */ 'Zion Wilson',
    /** birthPlace */ 'Salisbury, North Carolina',
    /** birthDate*/ 'July 6, 2000',

    /** heightCm */ 201,
    /** weightKg */ 129,

    /** college */ 'Duke',
    [
      /** gamesPlayed */ 33,
      /** gamesStarted */ 33,
      /** minutesPerGame */ 30,
      /** fieldGoalPercentage */ 680,
      /** threPointFieldGoalPercentage */ 338,
      /** freeThrowPercentage */ 640,
      /** reboundsPerGame */ 89,
      /** assistsPerGame */ 21,
      /** stealsPerGame */ 21,
      /** blocksPerGame */ 18,
      /** pointsPerGame */ 226,
    ],
  ]
  let BamAdebayo = [
    /** to */ accounts[0],
    /** name */ 'Bam Adebayo',
    /** birthPlace */ 'Newark, New Jersey',
    /** birthDate*/ 'July 18, 1997',

    /** heightCm */ 208,
    /** weightKg */ 113,

    /** college */ 'Kentucky',
    [
      /** gamesPlayed */ 24,
      /** gamesStarted */ 23,
      /** minutesPerGame */ 35,
      /** fieldGoalPercentage */ 474,
      /** threPointFieldGoalPercentage */ 348,
      /** freeThrowPercentage */ 547,
      /** reboundsPerGame */ 47,
      /** assistsPerGame */ 34,
      /** stealsPerGame */ 36,
      /** blocksPerGame */ 13,
      /** pointsPerGame */ 196,
    ],
  ]
  let valueToSend = {
    value: 600 * (10 ** 12)
  }
  // let value = await CC.valueReceived(valueToSend);
  // console.log(value)

  let gasCost = await CC.buyTokens.estimateGas(...ZionWilson, valueToSend)

  await CC.TokensPurchased().once('data', event => console.log(event))

  await CC.buyTokens(...ZionWilson, valueToSend)
    // .on('transactionHash', console.log)
    // .on('receipt', console.log)
    // .on('error', console.log)
    // .on('confirmation', console.log)
    
  await CC.buyTokens(...BamAdebayo, valueToSend)
    // .on('transactionHash', console.log)
    // .on('receipt', console.log)
    // .on('error', console.log)
    // .on('confirmation', console.log)
    
}
