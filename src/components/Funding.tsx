import { Web3Provider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import numeral from "numeral";
import { useEffect, useMemo, useState } from "react";

import { CONTRACT_ADDRESS, getContract } from "../dapp/contract";
import { getTokenPrice, getUserTokensBalance } from "../dapp/molaris";
import useContractView from "../hooks/useContractView";
import DepositBNB from "./DepositBNB";
import DepositCover from "./DepositCover";
import DepositReward from "./DepositReward";
import FormatNumber from "./FormatNumber";
import WithdrawBNB from "./WithdrawBNB";

const Funding = () => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const [totalCover, setTotalCover] = useState(0);

  const totalStacking = useContractView("get_total_fund", [], BigNumber.from(0));
  const userShare = useContractView("get_user_share", [account], BigNumber.from(0));

  const totalRewardToken = useContractView("get_total_reward_token", [], BigNumber.from(0));
  const totalRewardBNB = useContractView("get_total_reward_bnb", [], BigNumber.from(0));
  const contractOwner = useContractView("owner", [], "");
  const isContractOwner = account && account.toUpperCase() === contractOwner?.toUpperCase();

  const coverAddress = useContractView("get_cover_token_address", [], []);
  const tokensAmount = useMemo(() => {
    if (Array.isArray(coverAddress)) {
      getUserTokensBalance(CONTRACT_ADDRESS, coverAddress).then(setTotalCover);
    }
  }, [coverAddress]);

  const riskRatio = useMemo(() => {
    if (totalCover <= 0) {
      return 0;
    }

    return (Number(formatUnits(totalStacking)) / totalCover).toFixed(2) || 0;
  }, [totalCover, totalStacking]);

  return (
    <div className="flex justify-center mb-8">
      <div className="flex">
        <div className="flex flex-col">
          <div className="items-start stats">
            <div className="stat">
              <div className="stat-title">Cover balance</div>
              {/* <div className="stat-value">{numeral(totalCover, "$0,0.00")}</div> */}
              <div className="stat-value">{numeral(totalCover).format("$0,0.00")}</div>
              <div className="space-x-2 stat-actions">
                {isContractOwner && (
                  <a href="#deposit-cover" className="btn btn-sm btn-primary">
                    Add funds
                  </a>
                )}
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
              {isContractOwner && (
                <a href="#deposit-reward" className="btn btn-success">
                  Deposit reward
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="border-0 stat">
            <div className="stat-title">Risk ratio</div>
            <div className="stat-value">{riskRatio}</div>
            <div className="stat-desc text-info">Cover balance / Total staking pool</div>
            <div className="max-w-md whitespace-normal stat-actions">
              <p>When issue happends, the cover turns into claimable to cover the risk</p>
            </div>
          </div>
          <div className="!border-0 stat">
            <div className="stat-title">Your share</div>
            <div className="stat-value">{(userShare.toNumber() / 10).toFixed()}%</div>
            <div className="max-w-md whitespace-normal stat-actions">
              <p>Your share in staking pool. The reward will returns based on this share</p>
            </div>
          </div>
        </div>
      </div>

      <div id="deposit-cover" className="modal">
        <div className="modal-box">
          <DepositCover />
          <div className="modal-action">
            <a href="#" className="btn btn-sm">
              Close
            </a>
          </div>
        </div>
      </div>

      <div id="deposit-bnb" className="modal">
        <div className="modal-box">
          <DepositBNB />
          <div className="modal-action">
            <a href="#" className="btn btn-sm">
              Close
            </a>
          </div>
        </div>
      </div>

      <div id="withdraw-bnb" className="modal">
        <div className="modal-box">
          <WithdrawBNB />
          <div className="modal-action">
            <a href="#" className="btn btn-sm">
              Close
            </a>
          </div>
        </div>
      </div>

      <div id="deposit-reward" className="modal">
        <div className="modal-box">
          <DepositReward />
          <div className="modal-action">
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
