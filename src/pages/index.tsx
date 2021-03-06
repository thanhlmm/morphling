import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import Head from "next/head";

import Demo from "../components/Demo";
import { POLLING_INTERVAL } from "../dapp/connectors";

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Head>
        <title>Morphling - Join Binance launchpad everywhere!</title>
      </Head>
      <div className="container min-h-screen mx-auto">
        <Demo />
      </div>
      <footer className="p-10 footer bg-base-200 text-base-content">
        <div>
          <p>
            Built with ❤️ from{" "}
            <a className="link" target="_blank" href="https://thanhle.blog">
              Thanh Le
            </a>
          </p>
          <p>
            Story{" "}
            <a className="link" target="_blank" href="https://thanhle.blog/blog/morphling-dapp-to-join-binance-launchpad-without-any-restriction">
              https://thanhle.blog/blog/morphling-dapp-to-join-binance-launchpad-without-any-restriction
            </a>
          </p>
          <p>
            Contract address:{" "}
            <a
              className="link"
              target="_blank"
              href={`https://${process.env.NEXT_PUBLIC_NETWORK === "MAINNET" ? "" : "testnet."}bscscan.com/address/${
                process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
              }`}
            >
              {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}
            </a>
          </p>
        </div>
      </footer>
    </Web3ReactProvider>
  );
}

export default App;
