import { Web3Provider } from "@ethersproject/providers";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { getContract } from "../dapp/contract";

const DepositBNB = () => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const [maximum, setMaximum] = useState<BigNumber>(BigNumber.from(0));
  const [loading, setLoading] = useState(false);
  const [contractError, setContractError] = useState("");
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

  const handleClickPreset = (percent: number) => {
    setValue("amount", formatUnits(maximum.mul(BigNumber.from(percent)).div(BigNumber.from(100))));
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const contract = getContract();
      contract
        .connect(library.getSigner())
        .deposit_fund({ value: parseUnits(data.amount) })
        .then((data) => {
          console.log(data);
          if (data.wait) {
            return data.wait(7);
          }
          return true;
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
  };

  const isConnected = !!account;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-2 text-2xl font-bold">Staking BNB</h2>
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
      <p className="text-error">{contractError}</p>
      <div className="form-control">
        <button type="submit" className="btn btn-primary" disabled={!isConnected || loading}>
          Deposit
        </button>
      </div>
    </form>
  );
};

export default DepositBNB;
