/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface MorphlingInterface extends ethers.utils.Interface {
  functions: {
    "deposit_cover(address,uint256)": FunctionFragment;
    "deposit_fund()": FunctionFragment;
    "deposit_reward_bnb()": FunctionFragment;
    "deposit_reward_token(uint256)": FunctionFragment;
    "get_state()": FunctionFragment;
    "get_total_fund()": FunctionFragment;
    "get_total_reward_bnb()": FunctionFragment;
    "get_total_reward_token()": FunctionFragment;
    "get_user_share(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "request_cover()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "update_status(uint8)": FunctionFragment;
    "widthdraw_reward()": FunctionFragment;
    "withdraw_bnb(uint256)": FunctionFragment;
    "withdraw_cover(address)": FunctionFragment;
    "withdraw_fund(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "deposit_cover",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "deposit_fund",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "deposit_reward_bnb",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "deposit_reward_token",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "get_state", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "get_total_fund",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "get_total_reward_bnb",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "get_total_reward_token",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "get_user_share",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "request_cover",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "update_status",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "widthdraw_reward",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw_bnb",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw_cover",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw_fund",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "deposit_cover",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deposit_fund",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deposit_reward_bnb",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deposit_reward_token",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "get_state", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "get_total_fund",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "get_total_reward_bnb",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "get_total_reward_token",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "get_user_share",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "request_cover",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "update_status",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "widthdraw_reward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdraw_bnb",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdraw_cover",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdraw_fund",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export class Morphling extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: MorphlingInterface;

  functions: {
    deposit_cover(
      _token_address: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deposit_fund(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deposit_reward_bnb(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deposit_reward_token(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    get_state(overrides?: CallOverrides): Promise<[number]>;

    get_total_fund(overrides?: CallOverrides): Promise<[BigNumber]>;

    get_total_reward_bnb(overrides?: CallOverrides): Promise<[BigNumber]>;

    get_total_reward_token(overrides?: CallOverrides): Promise<[BigNumber]>;

    get_user_share(
      _user: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    request_cover(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    update_status(
      _next_state: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    widthdraw_reward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw_bnb(
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw_cover(
      _token_address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw_fund(
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  deposit_cover(
    _token_address: string,
    _amount: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deposit_fund(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deposit_reward_bnb(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deposit_reward_token(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  get_state(overrides?: CallOverrides): Promise<number>;

  get_total_fund(overrides?: CallOverrides): Promise<BigNumber>;

  get_total_reward_bnb(overrides?: CallOverrides): Promise<BigNumber>;

  get_total_reward_token(overrides?: CallOverrides): Promise<BigNumber>;

  get_user_share(_user: string, overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  request_cover(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  update_status(
    _next_state: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  widthdraw_reward(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdraw_bnb(
    _amount: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdraw_cover(
    _token_address: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdraw_fund(
    _to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    deposit_cover(
      _token_address: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    deposit_fund(overrides?: CallOverrides): Promise<void>;

    deposit_reward_bnb(overrides?: CallOverrides): Promise<void>;

    deposit_reward_token(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    get_state(overrides?: CallOverrides): Promise<number>;

    get_total_fund(overrides?: CallOverrides): Promise<BigNumber>;

    get_total_reward_bnb(overrides?: CallOverrides): Promise<BigNumber>;

    get_total_reward_token(overrides?: CallOverrides): Promise<BigNumber>;

    get_user_share(
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    request_cover(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    update_status(
      _next_state: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    widthdraw_reward(overrides?: CallOverrides): Promise<void>;

    withdraw_bnb(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw_cover(
      _token_address: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw_fund(_to: string, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;
  };

  estimateGas: {
    deposit_cover(
      _token_address: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deposit_fund(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deposit_reward_bnb(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deposit_reward_token(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    get_state(overrides?: CallOverrides): Promise<BigNumber>;

    get_total_fund(overrides?: CallOverrides): Promise<BigNumber>;

    get_total_reward_bnb(overrides?: CallOverrides): Promise<BigNumber>;

    get_total_reward_token(overrides?: CallOverrides): Promise<BigNumber>;

    get_user_share(
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    request_cover(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    update_status(
      _next_state: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    widthdraw_reward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdraw_bnb(
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdraw_cover(
      _token_address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdraw_fund(
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    deposit_cover(
      _token_address: string,
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deposit_fund(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deposit_reward_bnb(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deposit_reward_token(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    get_state(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    get_total_fund(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    get_total_reward_bnb(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    get_total_reward_token(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    get_user_share(
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    request_cover(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    update_status(
      _next_state: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    widthdraw_reward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdraw_bnb(
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdraw_cover(
      _token_address: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdraw_fund(
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
