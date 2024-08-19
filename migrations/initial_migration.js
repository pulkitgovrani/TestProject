const VolunteerToken = artifacts.require("VolunteerToken");
const VolunteerVerification = artifacts.require("VolunteerVerification");

module.exports = function (deployer) {
  deployer.deploy(VolunteerToken);
  deployer.deploy(VolunteerVerification);
};
