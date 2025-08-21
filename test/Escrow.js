const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Escrow", () => {
  let buyer, seller, inspector, lender;
  let realEstate, escrow;

  beforeEach(async () => {
    //Setup accounts
    [buyer, seller, inspector, lender] = await ethers.getSigners();

    //Deploy the RealEstate contract
    const RealEstate = await ethers.getContractFactory("RealEstate");
    realEstate = await RealEstate.deploy();
    //await realEstate.deployed();

    //Mint
    let transaction = await realEstate
      .connect(seller)
      .mint(
        "https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS"
      );

    await transaction.wait();

    const Escrow = await ethers.getContractFactory("Escrow");
    escrow = await Escrow.deploy(
      lender.address,
      inspector.address,
      seller.address,
      realEstate.address
    );

    // Approve escrow contract to transfer NFT
    transaction = await realEstate.connect(seller).approve(escrow.address, 1);
    await transaction.wait();

    // List the property (transfers NFT to escrow)
    transaction = await escrow
      .connect(seller)
      .list(1, tokens(10), tokens(5), buyer.address);
    await transaction.wait();
  });

  describe("Deployment", () => {
    it("Returns NFT address", async () => {
      const result = await escrow.nftAddress();
      expect(result).to.be.equal(realEstate.address);
    });
    it("Returns seller address", async () => {
      const result = await escrow.seller();
      expect(result).to.be.equal(seller.address);
    });
    it("Returns inspector address", async () => {
      const result = await escrow.inspector();
      expect(result).to.be.equal(inspector.address);
    });
    it("Returns lender address", async () => {
      const result = await escrow.lender();
      expect(result).to.be.equal(lender.address);
    });
  });

  describe("Listing", () => {
    it("Updates ownership", async () => {
      // Check that escrow contract now owns the NFT
      const result = await realEstate.ownerOf(1);
      expect(result).to.be.equal(escrow.address);
    });
    it("Updates isListed", async () => {
      const result = await escrow.isListed(1);
      expect(result).to.be.equal(true);
    });
    it("Updates purchase price", async () => {
      const result = await escrow.purchasePrice(1);
      expect(result).to.be.equal(tokens(10));
    });
    it("Updates escrow amount", async () => {
      const result = await escrow.escrowAmount(1);
      expect(result).to.be.equal(tokens(5));
    });
    it("Updates buyer", async () => {
      const result = await escrow.buyer(1);
      expect(result).to.be.equal(buyer.address);
    });
  });

  describe("Deposits", () => {
    it('Updates contract balance', async () => {
      const transaction = await escrow.connect(buyer).depositEarnest(1, { value: tokens(5) });
      await transaction.wait();

      const result = await escrow.getBalance();
      expect(result).to.be.equal(tokens(5));
    })
  });

  describe("Inspection", () => {
    it("Updates inspection status", async () => {
      const transaction = await escrow.connect(inspector).updateInspectionStatus(1, true);
      await transaction.wait();

      const result = await escrow.inspectionPassed(1);
      expect(result).to.be.equal(true);
    })
  });

  describe("Approval", () => {
    it("Updates approval status", async () => {
      let transaction = await escrow.connect(seller).approveSale(1);
      await transaction.wait();

      transaction = await escrow.connect(buyer).approveSale(1);
      await transaction.wait();

      transaction = await escrow.connect(lender).approveSale(1);
      await transaction.wait();

      expect(await escrow.approval(1, seller.address)).to.be.equal(true);
      expect(await escrow.approval(1, buyer.address)).to.be.equal(true);
      expect(await escrow.approval(1, lender.address)).to.be.equal(true);
    })
  });
});
