const AthleteToken = artifacts.require("AthleteToken");

module.exports = async (deployer) => {
  await deployer.deploy(AthleteToken, "National Football League", "NFL");
  let AT = await AthleteToken.deployed()
  AT.newCard(
    
    /** to */'0x5D27111dc74f9450a3D2400207385A8a1e59d260',
    /** id */12345,
    /** name */'Zion Wilson',
    /** birthPlace */'Salisbury, North Carolina',
    /** birthDate*/'July 6, 2000',

    /** heightCm */201,
    /** weightKg */129,

    /** college */'Duke',
    [
    /** gamesPlayed */33,
    /** gamesStarted */33,
    /** minutesPerGame */30,
    /** fieldGoalPercentage */680,
    /** threPointFieldGoalPercentage */338,
    /** freeThrowPercentage */640,
    /** reboundsPerGame */89,
    /** assistsPerGame */21,
    /** stealsPerGame */21,
    /** blocksPerGame */18,
    /** pointsPerGame */226
    ]
    
  )
  AT.newCard(

    /** to */'0x5D27111dc74f9450a3D2400207385A8a1e59d260',
    /** id */67890,
    /** name */'Bam Adebayo',
    /** birthPlace */'Newark, New Jersey',
    /** birthDate*/'July 18, 1997',

    /** heightCm */208,
    /** weightKg */113,

    /** college */'Kentucky',
    [
    /** gamesPlayed */33,
    /** gamesStarted */33,
    /** minutesPerGame */30,
    /** fieldGoalPercentage */680,
    /** threPointFieldGoalPercentage */338,
    /** freeThrowPercentage */640,
    /** reboundsPerGame */89,
    /** assistsPerGame */21,
    /** stealsPerGame */21,
    /** blocksPerGame */18,
    /** pointsPerGame */226
    ]

  )
};
