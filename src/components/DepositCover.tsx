import { MaxUint256 } from "@ethersproject/constants";
import { BigNumber } from "@ethersproject/contracts/node_modules/@ethersproject/bignumber";
import { Web3Provider } from "@ethersproject/providers";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  checkApprove,
  getERC20Contract,
  getTokenBalance,
  CONTRACT_ADDRESS,
  getContract,
  WAIT_BLOCK,
} from "../dapp/contract";
import { TOKENS } from "../dapp/tokens";

const DepositCover = () => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const [maximum, setMaximum] = useState<BigNumber>(BigNumber.from(0));
  const [isApproved, setApproved] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [contractError, setContractError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const tokenAddress = watch("token", null);
  useEffect(() => {
    if (tokenAddress?.length === 42) {
      getTokenBalance(tokenAddress, account, library).then(setMaximum);
      // TODO: Handle what if allowrance is less than X
      checkApproveToken(tokenAddress);
    }
  }, [tokenAddress, library, account]); // TODO: Remove depend on library?

  const checkApproveToken = (tokenAddress: string) => {
    checkApprove(tokenAddress, account, library).then(setApproved);
  };

  const handleClickPreset = (percent: number) => {
    setValue("amount", formatUnits(maximum.mul(BigNumber.from(percent)).div(BigNumber.from(100))));
    // MaxUint256
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
          .deposit_cover(data.token, parseUnits(data.amount))
          .then((data) => {
            console.log(data);
            if (data.wait) {
              return data.wait(WAIT_BLOCK);
            }
          })
          .then(() => {
            window.location.hash = "";
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
        .approve(CONTRACT_ADDRESS, MaxUint256)
        .then((data) => {
          if (data.wait) {
            return data.wait(WAIT_BLOCK);
          }

          return true;
        })
        .then(() => {
          checkApproveToken(data.token);
        });
    } catch (error) {
      setContractError(error?.message || "Error approve token");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isConnected = !!account;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-2 text-2xl font-bold">Deposit cover</h2>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Token</span>
        </label>
        <select className="w-full select select-bordered select-primary" {...register("token", { required: true })}>
          <option disabled selected>
            Choose your token
          </option>
          {Object.keys(TOKENS).map((token) => (
            <option key={token} value={TOKENS[token]}>
              {token}
            </option>
          ))}
        </select>
        {errors.token && <div className="text-error">This field is required</div>}
      </div>
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
        {errors.amount && <div className="text-error">This field is required</div>}
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
      <p className="text-error">{contractError}</p>
      <div className="form-control">
        <button type="submit" className="btn btn-primary" disabled={!isConnected || loading}>
          {isApproved ? "Deposit" : "Approve"}
        </button>
      </div>
    </form>
  );
};

export default DepositCover;
