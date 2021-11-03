import { expect } from "chai";
import { ethers } from "hardhat";
import { deployMockContract } from "ethereum-waffle";

import IERC20 from "../src/artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { Morphling } from "../src/types/Morphling";
import { BigNumber } from "@ethersproject/contracts/node_modules/@ethersproject/bignumber";

const STATE = {
  FUNDING: 1,
  LOCKING: 2,
  REWARD: 3,
  CLAIM_COVER: 4,
};

const BONUS_PERCENT = 5; // 5%
const DEPOSIT_BNB = parseUnits('10');
const DEPOSIT_COVER = parseUnits('100');
const DEPOSIT_REWARD_BNB = parseUnits('9.8');
const DEPOSIT_REWARD_TOKEN = parseUnits('1000');
const ROUND = BigNumber.from(1000000);

/**
 * 2 Users
 * Each deposit DEPOSIT_BNB
 * User 1 withdraw DEPOSIT_BNB / 2
 * => User 1: Own 33%
 * => user 2: Own 66%
 * 
 */

const convertNumber = (input: BigNumber, fixed: number = 3): string => {
  return Number(formatUnits(input)).toFixed(fixed)
}

describe("Morphling", function () {
  /**
   * Funding phase
   */
  let morphling: Morphling;
  let mockERC20 = null;

  this.beforeAll("Deploy contract", async () => {
    const [owner] = await ethers.getSigners();
    mockERC20 = await deployMockContract(owner, IERC20.abi);

    const Morphling = await ethers.getContractFactory("Morphling");
    morphling = await Morphling.deploy(BONUS_PERCENT, parseUnits('5'), mockERC20.address);
    await morphling.deployed();
  });

  it("Should be able to get contract status", async function () {
    expect(await morphling.get_state()).to.equal(STATE.FUNDING);
  });

  it("Should be able to deposit BNB", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const tx = await morphling.connect(addr1).deposit_fund({
      value: DEPOSIT_BNB,
    });

    await tx.wait();
    expect(await morphling.get_total_fund()).equal(DEPOSIT_BNB);
    expect(await morphling.get_user_share(addr1.address)).equal(ROUND.mul(1)); // 100%

    const tx2 = await morphling.connect(addr2).deposit_fund({
      value: DEPOSIT_BNB,
    });

    await tx2.wait();
    expect(await morphling.get_total_fund()).equal(DEPOSIT_BNB.mul(2));
    expect(await morphling.get_user_share(addr1.address)).equal(ROUND.div(2)); // 100%/2 = 50%
    expect(await morphling.get_user_share(addr2.address)).equal(ROUND.div(2)); // 100%/2 = 50%
    expect(await morphling.get_staking_pool_fee_total()).equal(DEPOSIT_BNB.mul(2));
  });

  it("Should be able to deposit ERC20 Token as cover", async function () {
    const [owner] = await ethers.getSigners();
    await mockERC20.mock.approve.returns(true);

    const tx = await mockERC20
      .connect(owner)
      .approve(morphling.address, DEPOSIT_COVER);
    await tx.wait();

    await mockERC20.mock.transferFrom.returns(true);
    await mockERC20.mock.balanceOf.returns(DEPOSIT_COVER);
    const tx2 = await morphling
      .connect(owner)
      .deposit_cover(mockERC20.address, DEPOSIT_COVER);
    await tx2.wait();

    expect(await mockERC20.balanceOf(morphling.address)).equal(DEPOSIT_COVER);
  });

  it("Shoud be able to withdraw BNB", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    // const startBalance = await owner.getBalance();

    const totalFundPool = await morphling.get_total_fund();

    const tx = await morphling.connect(addr1).withdraw_bnb(DEPOSIT_BNB.div(2));
    await tx.wait();
    expect(await morphling.get_total_fund()).equal(
      totalFundPool.sub(DEPOSIT_BNB.div(2))
    );

    expect(await morphling.get_user_share(addr1.address)).to.equal(ROUND.div(3)); // 33%
    expect(await morphling.get_user_share(addr2.address)).to.equal(ROUND.div(3).mul(2)); // 66%
    expect(await morphling.get_staking_pool_fee_total()).equal(DEPOSIT_BNB); // Only apply fee for user 2
  });

  it("Shoud not be able to withdraw BNB larger than staking", async function () {
    const [owner, addr1] = await ethers.getSigners();

    try {
      const tx = await morphling.connect(addr1).withdraw_bnb(DEPOSIT_BNB);
      await tx.wait();
    } catch (error) {
      expect(error.message).include("Out of amount");
    }
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
        "Required state"
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
    const tx = await morphling.connect(owner).withdraw_fund(owner.address);
    const txResult = await tx.wait();
    const totalBalance = await morphling.get_total_fund();
    const nowBalanace = await owner.getBalance();
    expect(convertNumber(nowBalanace)).equal(convertNumber(currentBalance.sub(txResult.gasUsed).add(totalBalance)));
  });

  /**
   * Reward step
   */
  it("Should be able to deposit BNB as reward", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const tx = await morphling.connect(addr1).deposit_reward_bnb({
      value: DEPOSIT_REWARD_BNB,
    });
    await tx.wait();

    expect(await morphling.get_total_reward_bnb()).equal(DEPOSIT_REWARD_BNB);
  });

  it("Should be able to deposit ERC20 as reward", async function () {
    const [owner] = await ethers.getSigners();

    await mockERC20.mock.transferFrom.returns(true);
    await mockERC20.mock.balanceOf.returns(DEPOSIT_REWARD_TOKEN);
    const tx = await morphling.connect(owner).deposit_reward_token(DEPOSIT_REWARD_TOKEN);
    await tx.wait();

    expect(await morphling.get_total_reward_token()).equal(DEPOSIT_REWARD_TOKEN);
  });

  it("Should not be able to withdraw in Locking phase", async function () {
    const [owner, addr1] = await ethers.getSigners();
    try {
      const tx = await morphling.connect(addr1).withdraw_bnb(10000);
      await tx.wait();
    } catch (error) {
      expect(error.message).include("Required state");
    }

    try {
      const tx = await morphling.connect(addr1).widthdraw_reward();
      await tx.wait();
    } catch (error) {
      expect(error.message).include("Required state");
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
    const [owner, addr1, addr2] = await ethers.getSigners();
    await mockERC20.mock.transfer.returns(true);

    expect(convertNumber(await morphling.get_reward_token(addr1.address)))
      .equal(convertNumber(DEPOSIT_REWARD_TOKEN.div(3))) // 33% of reward because current staking is 5, bellow FEE baseline
    const currentAdd1Balance = await addr1.getBalance();
    const tx = await morphling.connect(addr1).widthdraw_reward();
    const txResult = await tx.wait();

    // TODO: Test only by percent
    expect(convertNumber(await addr1.getBalance())).equal(
      convertNumber(currentAdd1Balance.sub(txResult.gasUsed).add(DEPOSIT_REWARD_BNB.div(3))) // 33%
    );

    expect(convertNumber(await morphling.get_reward_token(addr2.address)))
      .equal(convertNumber(DEPOSIT_REWARD_TOKEN.div(3).mul(2).mul(100 - BONUS_PERCENT).div(100))) // 66% of reward then reduce 5%
    const currentAdd2Balance = await addr2.getBalance();
    const tx2 = await morphling.connect(addr2).widthdraw_reward();
    const tx2Result = await tx2.wait();

    expect(convertNumber(await addr2.getBalance())).equal(
      convertNumber(currentAdd2Balance.sub(tx2Result.gasUsed).add(DEPOSIT_REWARD_BNB.div(3).mul(2))) // 66%
    );
  });

  it("Should be able to withdraw the reward bonus", async function () {
    const [owner, addr1] = await ethers.getSigners();
    try {
      const tx = await morphling.connect(addr1).withdraw_reward_bonus();
      await tx.wait();
    } catch (error) {
      expect(error.message).include("Ownable: caller is not the owner");
    }

    await mockERC20.mock.transfer.returns(true);
    expect(await morphling.get_staking_pool_fee_total()).equal(DEPOSIT_BNB); // Only apply fee for user 2

    const tx = await morphling.connect(owner).withdraw_reward_bonus();
    await tx.wait();
    // expect(mockERC20.mock.transfer).calledWith(owner.address, DEPOSIT_REWARD_TOKEN.mul(BONUS_PERCENT).div(100));
    expect(await morphling.get_staking_pool_fee_total()).equal(BigNumber.from(0)); // The bonus is over
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
