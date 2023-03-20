require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { API_URL, PRIVATE_KEY ,API_KEY } = process.env;


// module.exports = {
//   solidity: "0.8.17",
//   networks: {
//     goerli: {
//       url: `https://eth-goerli.g.alchemy.com/v2/${API_KEY}`,
//       accounts: [PRIVATE_KEY]
//     }
//   }
// };

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    // polygonMumbai: {
    //   url: "https://rpc-mumbai.maticvigil.com",
    //   accounts: [PRIVATE_KEY],
    //   gas: 2100000,
    //   gasPrice: 8000000000,
    // },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${API_KEY}`,
      accounts: [PRIVATE_KEY]
    },
    hyperspace: {
      chainId: 3141,
      url: "https://api.hyperspace.node.glif.io/rpc/v1",
      accounts: [PRIVATE_KEY],
  },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
    },
    customChain: {
      network: "polygonMumbai",
      // chainId: 31337,
      urls: {
        apiUrl: "https://api-testnet.polygonscan.com/",
        browserURL: "https://mumbai.polygonscan.com",
      },
    },
  },

};