import { Web3Provider } from "@ethersproject/providers";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { getContract, WAIT_BLOCK } from "../dapp/contract";
import useContractView from "../hooks/useContractView";

const DepositBNB = () => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const [loading, setLoading] = useState(false);
  const [contractError, setContractError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const myShare = useContractView("get_user_share", [account], BigNumber.from(0));
  const totalStacking = useContractView("get_total_fund", [], BigNumber.from(0));

  console.log({ myShare, totalStacking });

  const maximum = useMemo(() => {
    return totalStacking.mul(myShare).div(BigNumber.from(1000));
  }, [myShare, totalStacking]);

  const handleClickPreset = (percent: number) => {
    console.log(maximum);
    setValue("amount", formatUnits(maximum.mul(BigNumber.from(percent)).div(BigNumber.from(100))));
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const contract = getContract();
      contract
        .connect(library.getSigner())
        .withdraw_bnb(parseUnits(data.amount))
        .then((data) => {
          console.log(data);
          if (data.wait) {
            return data.wait(WAIT_BLOCK);
          }
          return true;
        })
        .then(() => {
          window.location.hash = "";
        });
    } catch (error) {
      setContractError(error?.message || "Error withdraw token");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isConnected = !!account;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-2 text-2xl font-bold">Withdraw BNB</h2>
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
          Withdraw
        </button>
      </div>
    </form>
  );
};

export default DepositBNB;
