import { expect } from "chai";
import { ethers } from "hardhat";
import { deployMockContract } from "ethereum-waffle";

import IERC20 from "../src/artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json";

const STATE = {
  FUNDING: 1,
  LOCKING: 2,
  REWARD: 3,
  CLAIM_COVER: 4,
};

describe("Morphling", function () {
  /**
   * Funding phase
   */
  let morphling = null;
  let mockERC20 = null;

  this.beforeAll("Deploy contract", async () => {
    const [owner] = await ethers.getSigners();
    mockERC20 = await deployMockContract(owner, IERC20.abi);

    const Morphling = await ethers.getContractFactory("Morphling");
    morphling = await Morphling.deploy(5, mockERC20.address);
    await morphling.deployed();
  });

  it("Should be able to get contract status", async function () {
    expect(await morphling.get_state()).to.equal(STATE.FUNDING);
  });

  it("Should be able to deposit BNB", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const totalFund = 1000000000;
    const tx = await morphling.connect(addr1).deposit_fund({
      value: totalFund,
    });

    await tx.wait();
    expect(await morphling.get_total_fund()).equal(totalFund);
    expect(await morphling.get_user_share(addr1.address)).equal(1000); // 100%

    const tx2 = await morphling.connect(addr2).deposit_fund({
      value: totalFund,
    });

    await tx2.wait();
    expect(await morphling.get_total_fund()).equal(totalFund * 2);
    expect(await morphling.get_user_share(addr1.address)).equal(500); // 50%
    expect(await morphling.get_user_share(addr2.address)).equal(500); // 50%
  });

  it("Should be able to deposit ERC20 Token as cover", async function () {
    const [owner] = await ethers.getSigners();
    const totalToken = 10000000000;

    await mockERC20.mock.approve.returns(true);

    const tx = await mockERC20
      .connect(owner)
      .approve(morphling.address, totalToken);
    await tx.wait();

    await mockERC20.mock.transferFrom.returns(true);
    await mockERC20.mock.balanceOf.returns(totalToken);
    const tx2 = await morphling
      .connect(owner)
      .deposit_cover(mockERC20.address, totalToken);
    await tx2.wait();

    expect(await mockERC20.balanceOf(morphling.address)).equal(totalToken);
  });

  it("Shoud be able to withdraw BNB", async function () {
    const [owner, addr1] = await ethers.getSigners();
    // const startBalance = await owner.getBalance();

    const totalFund = 1000000000;
    const tx = await morphling.connect(addr1).deposit_fund({
      value: totalFund,
    });
    await tx.wait();

    const totalFundPool = Number(await morphling.get_total_fund());

    const tx2 = await morphling.connect(addr1).withdraw_bnb(totalFund / 2);
    await tx2.wait();
    expect(await morphling.get_total_fund()).equal(
      Number(totalFundPool) - totalFund / 2
    );
    // expect(await owner.getBalance()).equal(startBalance + totalFund / 2);
  });

  /**
   * Locking phase
   */
  it("Should not be able to withdraw fund", async function () {
    const [owner, addr1] = await ethers.getSigners();
    try {
      const tx = await morphling.connect(addr1).withdraw_fund(addr1.address);
      await tx.wait();
    } catch (error) {
      expect(error.message).include("Ownable: caller is not the owner");
    }

    try {
      const tx = await morphling.connect(owner).withdraw_fund(owner.address);
      await tx.wait();
    } catch (error) {
      expect(error.message).include(
        "Must be in state Locking to withdraw the fund"
      );
    }
  });

  it("Should be able to change state into LOCKING", async function () {
    const [owner, addr1] = await ethers.getSigners();
    try {
      const tx = await morphling.connect(addr1).update_status(STATE.LOCKING);
      await tx.wait();
    } catch (error) {
      expect(error.message).include("Ownable: caller is not the owner");
    }

    const tx2 = await morphling.connect(owner).update_status(STATE.LOCKING);
    await tx2.wait();
    expect(await morphling.get_state()).equal(STATE.LOCKING);
  });

  it("Should be able to withdraw fund if I am Owner", async function () {
    const [owner] = await ethers.getSigners();
    const currentBalance = await owner.getBalance();
    const tx2 = await morphling.connect(owner).withdraw_fund(owner.address);
    await tx2.wait();
    const totalBalance = await morphling.get_total_fund();
    console.log({ totalBalance, currentBalance });
    expect(await owner.getBalance()).equal(currentBalance.add(totalBalance));
  });

  /**
   * Reward step
   */
  it("Should be able to deposit BNB as reward", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const totalFund = 1000000000;
    const tx = await morphling.connect(addr1).deposit_reward_bnb({
      value: totalFund,
    });
    await tx.wait();

    expect(await morphling.get_total_reward_bnb()).equal(totalFund);
  });

  it("Should be able to deposit ERC20 as reward", async function () {
    const [owner] = await ethers.getSigners();

    const totalFund = 1000000000;
    await mockERC20.mock.transferFrom.returns(true);
    await mockERC20.mock.balanceOf.returns(totalFund);
    const tx = await morphling.connect(owner).deposit_reward_token(totalFund);
    await tx.wait();

    expect(await morphling.get_total_reward_token()).equal(totalFund);
  });

  it("Should not be able to withdraw in Locking phase", async function () {
    const [owner, addr1] = await ethers.getSigners();
    try {
      const tx = await morphling.connect(addr1).withdraw_bnb(10000);
      await tx.wait();
    } catch (error) {
      expect(error.message).include("Only withdrawable in Funding phase");
    }

    try {
      const tx = await morphling.connect(addr1).widthdraw_reward();
      await tx.wait();
    } catch (error) {
      expect(error.message).include("Only withdrawlable in Reward phase");
    }
  });

  it("Should be able to change state into REWARD", async function () {
    const [owner, addr1] = await ethers.getSigners();
    try {
      const tx = await morphling.connect(addr1).update_status(STATE.REWARD);
      await tx.wait();
    } catch (error) {
      expect(error.message).include("Ownable: caller is not the owner");
    }

    const tx2 = await morphling.connect(owner).update_status(STATE.REWARD);
    await tx2.wait();
    expect(await morphling.get_state()).equal(STATE.REWARD);
  });

  it("Should be able to withdraw the reward", async function () {
    const totalFund = 1000000000;
    const [owner, addr1, addr2] = await ethers.getSigners();
    await mockERC20.mock.transfer.returns(true);

    const currentAdd1Balance = await addr1.getBalance();
    const tx = await morphling.connect(addr1).widthdraw_reward();
    await tx.wait();

    // TODO: Test only by percent
    expect(await addr1.getBalance()).equal(
      currentAdd1Balance.add(totalFund / 2)
    );

    const currentAdd2Balance = await addr2.getBalance();
    const tx2 = await morphling.connect(addr2).widthdraw_reward();
    await tx2.wait();

    expect(await addr1.getBalance()).equal(currentAdd2Balance.add(totalFund));
  });

  it("Should be able to withdraw the cover", async function () {
    const [owner, addr1] = await ethers.getSigners();

    try {
      const tx = await morphling
        .connect(addr1)
        .withdraw_cover(mockERC20.address);
      await tx.wait();
    } catch (error) {
      expect(error.message).include("Ownable: caller is not the owner");
    }

    await mockERC20.mock.transfer.returns(true);
    const tx2 = await morphling
      .connect(owner)
      .withdraw_cover(mockERC20.address);
    await tx2.wait();
  });

  /**
   * Claim cover phase
   */
  it("Should be able to request cover", async function () {
    // TODO:
  });
});
