/* eslint-disable no-nested-ternary */
import { useWeb3React } from "@web3-react/core";

function Account() {
  const { account } = useWeb3React();

  return (
    <div className="btn btn-ghost btn-sm rounded-btn">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 hover:text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <span>
        {account === null
          ? "-"
          : account
            ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
            : ""}
      </span>
    </div>
  );
}

export default Account;
