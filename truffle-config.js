const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config();

module.exports = {
  networks: {
    hedera: {
      provider: () => new HDWalletProvider(process.env.HEDERA_PRIVATE_KEY, "https://testnet.hedera.com"),
      network_id: 0, // Hedera network ID
      gas: 6721975,
      gasPrice: 1000000000,
    }
  },
  compilers: {
    solc: {
      version: "0.8.0"
    }
  }
};
