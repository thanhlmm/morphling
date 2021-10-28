/* eslint-disable no-nested-ternary */
import { Web3Provider } from "@ethersproject/providers";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected, } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import { injected, walletconnect, POLLING_INTERVAL } from "../dapp/connectors";
import { useEagerConnect, useInactiveListener } from "../dapp/hooks";
import logger from "../logger";

import Account from "./Account";
import Balance from "./Balance";
import ChainId from "./ChainId";

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  }
  if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  }
  if (error instanceof UserRejectedRequestErrorInjected || error instanceof UserRejectedRequestErrorWalletConnect) {
    return "Please authorize this website to access your Ethereum account.";
  }
  logger.error(error);
  return "An unknown error occurred. Check the console for more details.";
}

export function Header() {
  const context = useWeb3React<Web3Provider>();
  const { connector, library, account, activate, deactivate, active, error } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const activating = (connection: typeof injected | typeof walletconnect) => connection === activatingConnector;
  const connected = (connection: typeof injected | typeof walletconnect) => connection === connector;
  const disabled = !triedEager || !!activatingConnector || connected(injected) || connected(walletconnect) || !!error;

  const isConnected = connected(walletconnect) || connected(injected);

  const handleDisconnect = () => {
    if (connected(walletconnect)) {
      (connector as any).close();
    }

    // TODO: Fix refesh then it connect again ?_?

    deactivate();
  }

  return (
    <div className="my-3 shadow-lg navbar bg-neutral text-neutral-content rounded-box">
      <div className="flex-1 px-2 mx-2">
        <span className="text-lg font-bold">
          {active ? "🟢 Connected" : error ? "🔴 Error" : "🟠 Connect your wallet"}
        </span>
      </div>
      <div className="flex-none hidden px-2 mx-2 lg:flex">
        <div className="flex items-stretch">
          <ChainId />
          <Account />
          <Balance />
          {!isConnected && <a href="#connect-modal" className="btn btn-primary btn-sm">Connect</a>}
          {isConnected && <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={handleDisconnect}
          >
            Log out
          </button>}
        </div>
      </div>

      <div id="connect-modal" className="modal">
        <div className="modal-box">
          <div className="flex flex-col space-y-4">
            {error && <div className="alert alert-error">
              <div className="flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                </svg>
                <label>{getErrorMessage(error)}</label>
              </div>
            </div>}

            <button className="btn btn-secondary btn-block" onClick={() => {
              setActivatingConnector(injected);
              activate(injected);
            }}>MetaMark</button>
            <button className="btn btn-secondary btn-block" onClick={() => {
              setActivatingConnector(walletconnect);
              activate(walletconnect);
            }}>Wallet connect</button>
          </div>
          <div className="modal-action">
            <a href="#" className="btn btn-sm">Close</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
