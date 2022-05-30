const hre = require("hardhat");

async function main() {

  const RoloPunks = await hre.ethers.getContractFactory("RoloPunks");
  const roloPunks = await RoloPunks.deploy();

  await roloPunks.deployed();

  console.log("RoloPunks deployed to:", roloPunks.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
