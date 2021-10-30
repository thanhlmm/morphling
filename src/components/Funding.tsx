import { Web3Provider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { useCountDown } from "ahooks";
import cls from "classnames";
import dayjs from "dayjs";
import { BigNumber } from "ethers";
import dynamic from "next/dynamic";
import numeral from "numeral";
import { useEffect, useMemo, useState } from "react";

import { CONTRACT_ADDRESS, CONTRACT_STATE, getContract, WAIT_BLOCK } from "../dapp/contract";
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
  const minFree = useContractView("min_free", [], BigNumber.from(0));
  const fee = useContractView("bonus_percent", [], BigNumber.from(0));
  const totalStacking = useContractView("get_total_fund", [], BigNumber.from(0));
  const myStacking = useContractView("get_my_staking", [account], BigNumber.from(0));
  const userShare = useContractView("get_user_share", [account], BigNumber.from(0));
  const totalRewardToken = useContractView("get_total_reward_token", [], BigNumber.from(0));
  const totalRewardBNB = useContractView("get_total_reward_bnb", [], BigNumber.from(0));
  const myRewardBNB = useContractView("get_reward_bnb", [account], BigNumber.from(0));
  const myRewardToken = useContractView("get_reward_token", [account], BigNumber.from(0));
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

    return (Number(formatUnits(totalStacking)) / totalCover).toFixed(4) || 0;
  }, [totalCover, totalStacking]);

  const handleWithdrawFund = async () => {
    const contract = getContract();
    contract
      .connect(library.getSigner())
      .withdraw_fund(account)
      .then((data) => {
        if (data.wait) {
          return data.wait(WAIT_BLOCK);
        }
      })
      .then(() => {
        // TODO: Close modal
      });
  };

  const handleGetReward = async () => {
    const contract = getContract();
    contract
      .connect(library.getSigner())
      .widthdraw_reward()
      .then((data) => {
        if (data.wait) {
          return data.wait(WAIT_BLOCK);
        }
      })
      .then(() => {
        // TODO: Close modal
      });
  };

  const handleWithdrawBonus = () => {
    const contract = getContract();
    contract
      .connect(library.getSigner())
      .withdraw_reward_bonus()
      .then((data) => {
        if (data.wait) {
          return data.wait(WAIT_BLOCK);
        }
      })
      .then(() => {
        // TODO: Close modal
      });
  };

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
                return data.wait(WAIT_BLOCK);
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
                return data.wait(WAIT_BLOCK);
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

  console.log({ launchpadStateStr });

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="my-8">
        <ul className="w-full steps">
          <li
            data-content="🙌"
            className={cls("step", { "step-primary": launchpadStateStr >= CONTRACT_STATE.FUNDING })}
          >
            <span className="text-xl">Funding</span>
            {isLocking && <div className="text-lg text-success">Locked</div>}
            {isFunding && mockStateApi.funding && <Countdown date={mockStateApi.funding} />}
          </li>
          <li
            data-content="🔒"
            className={cls("step", { "step-primary": launchpadStateStr >= CONTRACT_STATE.LOCKING })}
          >
            <span className="text-xl">Locking</span>
            {isReward && <div className="text-lg text-success">Locked</div>}
            {isLocking && mockStateApi.locking && <Countdown date={mockStateApi.locking} />}
          </li>
          <li data-content="🎉" className={cls("step", { "step-primary": launchpadStateStr >= CONTRACT_STATE.REWARD })}>
            <span className="text-xl">Reward</span>
            {isReward && mockStateApi.reward && <Countdown date={mockStateApi.reward} showDay={false} />}
          </li>
          <li data-content="🤕" className={cls("step", { "step-error": isClaimCover })}>
            <span className="text-xl">Claim cover</span>
          </li>
        </ul>
      </div>

      <div className="my-2 mb-4 alert alert-success">
        <div className="flex-1">
          <label className="font-bold">
            <span className="text-xl">🤝</span> Staking lower than {formatUnits(minFree)} BNB is FREE
          </label>
        </div>
      </div>

      <div className="flex">
        <div className="flex flex-col">
          <div className="items-start stats">
            <div className="stat">
              <div className="stat-title">Cover balance</div>
              {/* <div className="stat-value">{numeral(totalCover, "$0,0.00")}</div> */}
              <div className="stat-value">{numeral(totalCover).format("$0,0.00")}</div>
              <div className="space-x-2 stat-actions">
                {/* <div data-tip="Building" className="tooltip tooltip-warning tooltip-right">
                  <button className="btn btn-sm btn-success" disabled>
                    Claim
                  </button>
                </div> */}
              </div>
            </div>
            <div className="stat !border-0">
              <div className="stat-title">Current staking (BNB)</div>
              <div className="stat-value">
                <FormatNumber number={totalStacking} />
              </div>
              <div className="text-xl stat-desc text-success">
                Your: <FormatNumber number={myStacking} />
              </div>
              <div className="space-x-2 stat-actions">
                <a
                  className={cls("btn btn-sm", { "btn-primary": isFunding, "btn-disabled": !isFunding })}
                  href="#deposit-bnb"
                >
                  Deposit
                </a>
                <a
                  className={cls("btn btn-sm", { "btn-success": isFunding, "btn-disabled": !isFunding })}
                  href="#withdraw-bnb"
                >
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
                  <div className="stat-title">{process.env.NEXT_PUBLIC_REWARD_TOKEN_NAME}</div>
                  <div className="stat-value">
                    <FormatNumber number={totalRewardToken} />
                  </div>
                  <div className="text-xl stat-desc text-success">
                    Your: <FormatNumber number={myRewardToken} />
                  </div>
                </div>
                <div className="stat !border-0">
                  <div className="stat-title">BNB</div>
                  <div className="stat-value">
                    <FormatNumber number={totalRewardBNB} />
                  </div>
                  <div className="text-xl stat-desc text-success">
                    Your: <FormatNumber number={myRewardBNB} />
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-6 space-x-2 stat-actions">
              <button onClick={handleGetReward} className="btn btn-primary" disabled={!isReward}>
                Get reward
              </button>
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
            <div className="flex stat-value">{(userShare.toNumber() / 10).toFixed()}%</div>
            <div className="max-w-md whitespace-normal stat-actions">
              <p>Your share in staking pool. The reward will returns based on this share</p>
            </div>
          </div>
          <div className="!border-0 stat">
            <div className="stat-title">Fee</div>
            <div className="flex stat-value">{Number(fee.toString())}%</div>
            <div className="stat-desc text-info">of reward token only</div>
            <div className="max-w-md whitespace-normal stat-actions">
              <p>
                Staking lower than <strong>{formatUnits(minFree)} BNB</strong> is FREE.
              </p>
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
          <a href="#deposit-cover" className={cls("btn", { "btn-info": isFunding, "btn-disabled": !isFunding })}>
            1. Add Cover fund
          </a>

          <button onClick={handleWithdrawFund} disabled={!isLocking} className="btn btn-info">
            2. Withdraw staking fund
          </button>

          <a href="#deposit-reward" className={cls("btn", { "btn-info": isLocking, "btn-disabled": !isLocking })}>
            3. Deposit reward
          </a>

          <button onClick={handleWithdrawBonus} disabled={!isReward} className="btn btn-info">
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
