

require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {


  networks: {

    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },

    ropsten: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [process.env.WALLET_PRIVATE_KEY],
          numberOfAddresses: 1,
          providerOrUrl: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        }),
      network_id: 3,
      networkCheckTimeout: 1000000,
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      confirmations: 2, // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.15",
    },
  },
};
