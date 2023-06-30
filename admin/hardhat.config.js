/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  paths:{
    sources: "./src/Containers/Metamask/solidity/contracts",
    tests: "./src/Containers/Metamask/solidity/test",
    cache:  "./src/Containers/Metamask/solidity/cache",
    artifacts: "./src/Containers/Metamask/solidity/artifacts",
  }
};
