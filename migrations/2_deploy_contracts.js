const SimpleStorage = artifacts.require("SimpleStorage");
const TutorialToken = artifacts.require("TutorialToken");
const ComplexStorage = artifacts.require("ComplexStorage");
const AthleteToken = artifacts.require("AthleteToken");

module.exports = function(deployer) {
  deployer.deploy(AthleteToken, "Natioanl Football Association", "NFL");
  AthleteToken.deployed().then(
    c => c.newCard(
      '0x5D27111dc74f9450a3D2400207385A8a1e59d260',
      12345, 'Smoochie Wilson', 'Buffalo Bills', 1, 2, 3, 4, 5
    )
  )
};
