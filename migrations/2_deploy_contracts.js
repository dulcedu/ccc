const AthleteToken = artifacts.require("AthleteToken");

module.exports = async (deployer) => {
  await deployer.deploy(AthleteToken, "National Football League", "NFL");
  (await AthleteToken.deployed()).newCard(
    '0x5D27111dc74f9450a3D2400207385A8a1e59d260',
    12345,
    'Smoochie Wilson',
    'Buffalo Bills',
    1, 2, 3, 4, 5
  )
};
