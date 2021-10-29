import { Web3Provider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { useCountDown } from "ahooks";
import cls from "classnames";
import dayjs from "dayjs";
import { BigNumber } from "ethers";
import numeral from "numeral";
import { useEffect, useMemo, useState } from "react";

import { CONTRACT_ADDRESS, CONTRACT_STATE, getContract } from "../dapp/contract";
import { getTokenPrice, getUserTokensBalance } from "../dapp/molaris";
import useContractView from "../hooks/useContractView";
import Countdown from "./Countdown";
import DepositBNB from "./DepositBNB";
import DepositCover from "./DepositCover";
import DepositReward from "./DepositReward";
import FormatNumber from "./FormatNumber";
import WithdrawBNB from "./WithdrawBNB";

// TODO: Query from api
const mockStateApi = {
  funding: dayjs().add(1, "d").toDate(),
  locking: dayjs().add(8, "d").toDate(),
  reward: dayjs().add(8, "d").add(6, "h").toDate(),
};

const Funding = () => {
  const { account, library } = useWeb3React<Web3Provider>();
  const [totalCover, setTotalCover] = useState(0);

  const launchpadState = useContractView("get_state", [], BigNumber.from(1));
  const launchpadStateStr = launchpadState.toString();
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

  const handleNextState = async () => {
    const contract = getContract();
    switch (launchpadState.toString()) {
      case CONTRACT_STATE.FUNDING:
        if (confirm("Make sure you have: 1. Add cover fund, 2. Some one is stacking")) {
          contract
            .connect(library.getSigner())
            .update_status(BigNumber.from(CONTRACT_STATE.LOCKING))
            .then((data) => {
              if (data.wait) {
                return data.wait(7);
              }
            })
            .then(() => {
              // TODO: Close modal
            });
        }
        break;
      case CONTRACT_STATE.LOCKING:
        if (confirm("Make sure you have: 1. Deposit reward BNB, 2. Deposit reward Token")) {
          contract
            .connect(library.getSigner())
            .update_status(BigNumber.from(CONTRACT_STATE.REWARD))
            .then((data) => {
              if (data.wait) {
                return data.wait(7);
              }
            })
            .then(() => {
              // TODO: Close modal
            });
        }
        break;
    }
  };

  const isFunding = launchpadStateStr === CONTRACT_STATE.FUNDING;
  const isLocking = launchpadStateStr === CONTRACT_STATE.LOCKING;
  const isReward = launchpadStateStr === CONTRACT_STATE.REWARD;
  const isClaimCover = launchpadStateStr === CONTRACT_STATE.CLAIM_COVER;

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="my-8">
        <ul className="w-full steps">
          <li data-content="🙌" className={cls("step", { "step-primary": isFunding })}>
            <span className="text-xl">Funding</span>
            {isLocking && <div className="text-lg text-success">Locked</div>}
            {isFunding && mockStateApi.funding && <Countdown date={mockStateApi.funding} />}
          </li>
          <li data-content="🔒" className={cls("step", { "step-primary": isLocking })}>
            <span className="text-xl">Locking</span>
            {isReward && <div className="text-lg text-success">Locked</div>}
            {isLocking && mockStateApi.locking && <Countdown date={mockStateApi.locking} />}
          </li>
          <li data-content="🎉" className={cls("step", { "step-primary": isReward })}>
            <span className="text-xl">Reward</span>
            {isReward && mockStateApi.reward && <Countdown date={mockStateApi.reward} showDay={false} />}
          </li>
          <li data-content="🤕" className={cls("step", { "step-error": isClaimCover })}>
            <span className="text-xl">Claim cover</span>
          </li>
        </ul>
      </div>

      <div className="flex">
        <div className="flex flex-col">
          <div className="items-start stats">
            <div className="stat">
              <div className="stat-title">Cover balance</div>
              {/* <div className="stat-value">{numeral(totalCover, "$0,0.00")}</div> */}
              <div className="stat-value">{numeral(totalCover).format("$0,0.00")}</div>
              <div className="space-x-2 stat-actions">
                <div data-tip="Building" className="tooltip tooltip-warning tooltip-right">
                  <button className="btn btn-sm btn-success" disabled>
                    Claim
                  </button>
                </div>
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

      <hr />
      {isContractOwner && (
        <div className="my-4 space-x-4">
          <button onClick={handleNextState} className="btn btn-error">
            Next status
          </button>
          <a href="#deposit-cover" className="btn btn-info">
            1. Add Cover fund
          </a>

          <a href="#deposit-cover" className="btn btn-info">
            2. Withdraw staking fund
          </a>

          <a href="#deposit-reward" className="btn btn-info">
            3. Deposit reward
          </a>

          <button disabled className="btn btn-info">
            4. Get reward
          </button>

          <button disabled className="btn btn-info">
            5. Withdraw Cover
          </button>
        </div>
      )}

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
