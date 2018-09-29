var PassportFactory = artifacts.require("./PassportFactory.sol");
var TravelEntryFactory = artifacts.require("./TravelEntryFactory.sol");

module.exports = function(deployer) {
    deployer.deploy(PassportFactory);
    deployer.deploy(TravelEntryFactory);
};
