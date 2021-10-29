import { Contract, ContractFunction } from "@ethersproject/contracts";
import contract from '../artifacts/contracts/Morphling.sol/Morphling.json';
import erc20Contract from '../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json';
import { MorphlingInterface } from "../types/Morphling";
import { BigNumber } from "@ethersproject/contracts/node_modules/@ethersproject/bignumber";

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const CONTRACT_STATE = {
  FUNDING: '1',
  LOCKING: '2',
  REWARD: '3',
  CLAIM_COVER: '4'
}

// TODO: Leverage contract abi into Typescript
export function getContract(): Contract {
  return new Contract(CONTRACT_ADDRESS, contract.abi)
}

export function getERC20Contract(address: string): Contract {
  return new Contract(address, erc20Contract.abi)
}

export async function getTokenBalance(tokenAddress: string, userAddress: string, signer): Promise<BigNumber> {
  const balance = await getERC20Contract(tokenAddress).connect(signer).balanceOf(userAddress) as BigNumber;
  return balance;
}

export async function getAllowrance(tokenAddress: string, userAddress: string, ownerAddress: string, signer): Promise<BigNumber> {
  const balance = await getERC20Contract(tokenAddress).connect(signer).allowance(userAddress, ownerAddress) as BigNumber;
  return balance;
}

export async function checkApprove(tokenAddress: string, userAddress: string, signer): Promise<boolean> {
  const balance = await getAllowrance(tokenAddress, userAddress, CONTRACT_ADDRESS, signer);
  console.log({ allow: balance.toString() })
  const MINIMUM_AMOUNT = BigNumber.from(1000000000);
  return balance.gt(MINIMUM_AMOUNT);
}