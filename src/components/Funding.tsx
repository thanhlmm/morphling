import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";

import { getContract } from "../dapp/contract";
import { getTokenPrice } from "../dapp/molaris";
import useContractView from "../hooks/useContractView";
import DepositCover from "./DepositCover";
import FormatNumber from "./FormatNumber";

const Funding = () => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();

  const totalStacking = useContractView("get_total_fund", [], 0);
  const userShare = useContractView("get_user_share", [account], 0);

  const totalRewardToken = useContractView("get_total_reward_token", [], 0);
  const totalRewardBNB = useContractView("get_total_reward_bnb", [], 0);

  // useEffect(() => {
  //   const price = getTokenPrice("0xe9e7cea3dedca5984780bafc599bd69add087d56").then(console.log);
  // }, []);

  // const coverAddress = useContractView("get_cover_token_address", [], []);
  // const tokensAmount = useMemo(() => {
  //   console.log(coverAddress);
  // }, [coverAddress]);

  return (
    <div className="flex justify-center mb-8">
      <div className="flex">
        <div className="flex flex-col">
          <div className="items-start stats">
            <div className="stat">
              <div className="stat-title">Cover balance</div>
              <div className="stat-value">$89,400</div>
              <div className="space-x-2 stat-actions">
                <a href="#deposit-cover" className="btn btn-sm btn-primary">
                  Add funds
                </a>
                <button className="btn btn-sm btn-success">Claim</button>
              </div>
            </div>
            <div className="stat !border-0">
              <div className="stat-title">Current staking</div>
              <div className="stat-value">
                <FormatNumber number={totalStacking} unit="BNB" />
              </div>
              <div className="space-x-2 stat-actions">
                <a className="btn btn-sm btn-primary" href="#deposit-bnb">
                  Deposit
                </a>
                <a className="btn btn-sm btn-success" href="#withdraw-bnb">
                  Withdraw
                </a>
              </div>
            </div>
          </div>
          <hr />
          <div className="flex flex-col py-4 stats">
            <div className="ml-6 stat-value text-primary">Reward pool 🎉</div>
            <div className="">
              <div className="flex flex-row">
                <div className="stat">
                  <div className="stat-title">Lazio</div>
                  <div className="stat-value">
                    <FormatNumber number={totalRewardToken} />
                  </div>
                </div>
                <div className="stat !border-0">
                  <div className="stat-title">BNB</div>
                  <div className="stat-value">
                    <FormatNumber number={totalRewardBNB} />
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-6 space-x-2 stat-actions">
              <button className="btn btn-primary">Get reward</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="border-0 stat">
            <div className="stat-title">Risk ratio</div>
            <div className="stat-value">0.42</div>
            <div className="stat-desc text-info">Total staking pool / Cover balance</div>
            <div className="max-w-md whitespace-normal stat-actions">
              <p>When issue happends, the cover turns into claimable to cover the risk</p>
            </div>
          </div>
          <div className="!border-0 stat">
            <div className="stat-title">Your share</div>
            <div className="stat-value">{(BigNumber.from(userShare).toNumber() / 10).toFixed()}%</div>
            <div className="max-w-md whitespace-normal stat-actions">
              <p>Your share in staking pool. The reward will returns based on this share</p>
            </div>
          </div>
        </div>
      </div>

      <div id="deposit-cover" className="modal">
        <div className="modal-box">
          <DepositCover />
        </div>
      </div>

      <div id="deposit-bnb" className="modal">
        <div className="modal-box">
          <div className="form-control">
            <label className="label">
              <span className="label-text">BNB Amount</span>
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="0"
                className="w-full pr-16 border input input-primary input-bordered border-primary"
              />
              <button className="absolute top-0 right-0 rounded-l-none btn btn-primary">max</button>
            </div>

            <input type="range" max="100" value="50" className="range range-primary" />
          </div>
          <div className="modal-action">
            <button className="btn btn-sm btn-primary">Accept</button>
            <a href="#" className="btn btn-sm">
              Close
            </a>
          </div>
        </div>
      </div>

      <div id="withdraw-bnb" className="modal">
        <div className="modal-box">
          <div className="form-control">
            <label className="label">
              <span className="label-text">BNB Amount</span>
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="0"
                className="w-full pr-16 border input input-primary input-bordered border-primary"
              />
              <button className="absolute top-0 right-0 rounded-l-none btn btn-primary">max</button>
            </div>

            <input type="range" max="100" value="50" className="range range-primary" />
          </div>
          <div className="modal-action">
            <button className="btn btn-sm btn-primary">Accept</button>
            <a href="#" className="btn btn-sm">
              Close
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funding;
