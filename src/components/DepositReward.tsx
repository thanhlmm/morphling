import { MaxUint256 } from "@ethersproject/constants";
import { Web3Provider } from "@ethersproject/providers";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { checkApprove, getContract, getERC20Contract, getTokenBalance } from "../dapp/contract";

const DepositReward = () => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const [maximum, setMaximum] = useState<BigNumber>(BigNumber.from(0));
  const [maximumToken, setMaximumToken] = useState<BigNumber>(BigNumber.from(0));
  const [loading, setLoading] = useState(false);
  const [contractError, setContractError] = useState("");
  const [isApproved, setApproved] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (account) {
      library
        .getBalance(account)
        .then((accountBalance: any) => {
          setMaximum(accountBalance);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [library, account]); // TODO: Remove depend on library?

  useEffect(() => {
    if (library && account) {
      getTokenBalance(process.env.NEXT_PUBLIC_REWARD_TOKEN, account, library).then(setMaximumToken);
    }
  }, [library, account]); // TODO: Remove depend on library?

  const checkApproveToken = (tokenAddress: string) => {
    checkApprove(tokenAddress, account, library).then(setApproved);
  };

  console.log(process.env.NEXT_PUBLIC_REWARD_TOKEN);

  useEffect(() => {
    // TODO: Query reward token from API?
    if (library && account) {
      checkApproveToken(process.env.NEXT_PUBLIC_REWARD_TOKEN);
    }
  }, [library, account]);

  const handleClickPreset = (percent: number) => {
    setValue("amount", formatUnits(maximum.mul(BigNumber.from(percent)).div(BigNumber.from(100))));
  };

  const handleClickPresetToken = (percent: number) => {
    setValue("tokenAmount", formatUnits(maximumToken.mul(BigNumber.from(percent)).div(BigNumber.from(100))));
  };

  const onSubmit = async (data) => {
    console.log(data);
    if (!account || !library) {
      return;
    }

    setContractError("");

    if (isApproved) {
      try {
        setLoading(true);
        const contract = getContract();
        contract
          .connect(library.getSigner())
          .deposit_NEXT_PUBLIC_REWARD_TOKEN(parseUnits(data.tokenAmount), { value: parseUnits(data.amount) })
          .then((data) => {
            console.log(data);
            if (data.wait) {
              return data.wait(7);
            }
          })
          .then(() => {
            // TODO: Close modal
          });
      } catch (error) {
        setContractError(error?.message || "Error deposit token");
        console.error(error);
      } finally {
        setLoading(false);
      }

      return;
    }

    try {
      setLoading(true);
      console.log("start approve", library);
      await getERC20Contract(data.token)
        .connect(library.getSigner())
        .approve(process.env.NEXT_PUBLIC_REWARD_TOKEN, MaxUint256)
        .then((data) => {
          if (data.wait) {
            return data.wait(7);
          }

          return true;
        })
        .then(() => {
          checkApproveToken(process.env.NEXT_PUBLIC_REWARD_TOKEN);
        });
    } catch (error) {
      setContractError(error?.message || "Error approve token");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isConnected = !!account;

  // TODO: Check max amount can input
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-2 text-2xl font-bold">Deposit reward</h2>
      <div className="form-control">
        <label className="label">
          <span className="label-text">BNB Amount</span>
        </label>
        <div>
          <input
            type="number"
            placeholder="0"
            className="w-full border input input-primary input-bordered border-primary"
            step="0.00000000001"
            {...register("amount", { required: true, min: 0 })}
          />
        </div>
      </div>
      <div className="flex justify-between my-4">
        <button
          type="button"
          onClick={() => handleClickPreset(25)}
          className="px-6 btn btn-outline btn-secondary btn-sm"
        >
          25%
        </button>
        <button
          type="button"
          onClick={() => handleClickPreset(50)}
          className="px-6 btn btn-outline btn-secondary btn-sm"
        >
          50%
        </button>
        <button
          type="button"
          onClick={() => handleClickPreset(70)}
          className="px-6 btn btn-outline btn-secondary btn-sm"
        >
          75%
        </button>
        <button
          type="button"
          onClick={() => handleClickPreset(100)}
          className="px-6 btn btn-outline btn-secondary btn-sm"
        >
          100%
        </button>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Token Amount</span>
        </label>
        <div>
          <input
            type="number"
            placeholder="0"
            className="w-full border input input-primary input-bordered border-primary"
            step="0.00000000001"
            {...register("tokenAmount", { required: true, min: 0 })}
          />
        </div>
      </div>
      <div className="flex justify-between my-4">
        <button
          type="button"
          onClick={() => handleClickPresetToken(25)}
          className="px-6 btn btn-outline btn-secondary btn-sm"
        >
          25%
        </button>
        <button
          type="button"
          onClick={() => handleClickPresetToken(50)}
          className="px-6 btn btn-outline btn-secondary btn-sm"
        >
          50%
        </button>
        <button
          type="button"
          onClick={() => handleClickPresetToken(70)}
          className="px-6 btn btn-outline btn-secondary btn-sm"
        >
          75%
        </button>
        <button
          type="button"
          onClick={() => handleClickPresetToken(100)}
          className="px-6 btn btn-outline btn-secondary btn-sm"
        >
          100%
        </button>
      </div>
      <p className="text-error">{contractError}</p>
      <div className="form-control">
        <button type="submit" className="btn btn-primary" disabled={!isConnected || loading}>
          Deposit
        </button>
      </div>
    </form>
  );
};

export default DepositReward;
