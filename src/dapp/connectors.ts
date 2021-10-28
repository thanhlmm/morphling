import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const POLLING_INTERVAL = 5000; // BSC block time is 5s
export const injected = new InjectedConnector({
  supportedChainIds: [97, 56],
});

const RPC_URLS: { [chainId: number]: string } = {
  97: process.env.NEXT_PUBLIC_RPC_URL_97,
  56: process.env.NEXT_PUBLIC_RPC_URL_56,
};

export const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  qrcode: true,
});
