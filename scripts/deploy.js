
const hre = require("hardhat");

const tokens = (n) => {
  return hre.ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  //Setup accounts
  const [buyer, seller, inspector, lender] = await hre.ethers.getSigners();

  //Deploy Real Estate
  const RealEstate = await hre.ethers.getContractFactory("RealEstate");
  const realEstate = await RealEstate.deploy();

  console.log("Real Estate deployed to: ", realEstate.address);
  await realEstate.deployed();
  console.log("Minting 3 properties...");

  for (let i = 0; i < 3; i++) {
    const transaction = await realEstate
      .connect(seller)
      .mint(
        `https://ipfs.io/ipfs/QmQVcpsjrA6cr1iJjZAodYwmPekYgbnXGo4DFubJiLc2EB/${i + 1}.json`
      );
    await transaction.wait();
  }

  //Deploy Escrow
  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(
    lender.address,
    inspector.address,
    seller.address,
    realEstate.address
  );
  await escrow.deployed();

  console.log("Escrow deployed to: ", escrow.address);

  for (let i = 0; i < 3; i++) {
   //Approve Properties
    const transaction = await realEstate.connect(seller).approve(escrow.address, i + 1);
    await transaction.wait();
  }

  //List Properties
  const purchasePrices = [20, 15, 10];
  const escrowAmounts = [10, 5, 2];
  
  for (let i = 0; i < 3; i++) {
    const transaction = await escrow.connect(seller).list(
      i + 1,
      tokens(purchasePrices[i]),
      tokens(escrowAmounts[i]),
      buyer.address
    );
    await transaction.wait();
  }

  console.log("Properties listed...");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
