import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react"
import { getContract } from "../dapp/contract";

export default <T>(method: string, args: any[] = [], defaultValue: T = null, liveUpdate = true) => {
  const [value, setValue] = useState(defaultValue);
  const { account, library, chainId } = useWeb3React<Web3Provider>();

  const fetchValue = () => {
    const contract = getContract();
    contract
      .connect(library)[method](...args)
      .then((data) => {
        setValue(data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (!library) {
      return;
    }

    fetchValue();
    if (liveUpdate) {
      library.on('block', fetchValue);

      return () => {
        library.off('block', fetchValue)
      }
    }

    return () => {

    }

  }, [account, library, chainId, liveUpdate]);

  return value;
}