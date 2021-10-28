import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react"
import { getContract } from "../dapp/contract";

export default (method: string, args: any[] = [], defaultValue: any = null) => {
  const [value, setValue] = useState(defaultValue);
  const { account, library, chainId } = useWeb3React<Web3Provider>();

  useEffect(() => {
    if (!library) {
      return;
    }

    const contract = getContract();
    contract
      .connect(library)[method](...args)
      .then((data) => {
        setValue(data);
      })
      .catch((error) => console.error(error));

  }, [account, library, chainId]);

  return value;
}