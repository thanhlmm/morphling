/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Morphling, MorphlingInterface } from "../Morphling";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_bonus_percent",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_reward_token",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token_address",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "deposit_cover",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit_fund",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit_reward_bnb",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "deposit_reward_token",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "get_cover_token_address",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "get_state",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "get_total_fund",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "get_total_reward_bnb",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "get_total_reward_token",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "get_user_share",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "request_cover",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_next_state",
        type: "uint8",
      },
    ],
    name: "update_status",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "widthdraw_reward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdraw_bnb",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token_address",
        type: "address",
      },
    ],
    name: "withdraw_cover",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_to",
        type: "address",
      },
    ],
    name: "withdraw_fund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405260006006556001600960146101000a81548160ff021916908360ff1602179055506103e8600960156101000a81548161ffff021916908361ffff1602179055503480156200005157600080fd5b5060405162002b9438038062002b948339818101604052810190620000779190620002f8565b620000976200008b6200013260201b60201c565b6200013a60201b60201c565b620000e26040518060400160405280601381526020017f4465706c6f79696e67204d6f7270686c696e6700000000000000000000000000815250620001fe60201b620017541760201c565b8160018190555080600960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505062000473565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6200029e816040516024016200021591906200037a565b6040516020818303038152906040527f41304fac000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050620002a160201b60201c565b50565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b600081519050620002db816200043f565b92915050565b600081519050620002f28162000459565b92915050565b600080604083850312156200030c57600080fd5b60006200031c85828601620002e1565b92505060206200032f85828601620002ca565b9150509250929050565b600062000346826200039e565b620003528185620003a9565b935062000364818560208601620003f8565b6200036f816200042e565b840191505092915050565b6000602082019050818103600083015262000396818462000339565b905092915050565b600081519050919050565b600082825260208201905092915050565b6000620003c782620003ce565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b8381101562000418578082015181840152602081019050620003fb565b8381111562000428576000848401525b50505050565b6000601f19601f8301169050919050565b6200044a81620003ba565b81146200045657600080fd5b50565b6200046481620003ee565b81146200047057600080fd5b50565b61271180620004836000396000f3fe6080604052600436106101145760003560e01c80637d152e46116100a05780639bbd95b9116100645780639bbd95b914610304578063b59d4c951461032f578063b87885ee1461034b578063e4ba226c14610355578063f2fde38b1461038057610114565b80637d152e461461022f57806386b301ad146102465780638da5cb5b1461027157806395282f361461029c5780639a381eab146102c757610114565b806358956c66116100e757806358956c661461019e578063673df57c146101a8578063703d14ea146101d3578063715018a6146101ef57806379f496601461020657610114565b80630b3109a8146101195780631d230d05146101425780634e5a60571461015957806354dcc6eb14610175575b600080fd5b34801561012557600080fd5b50610140600480360381019061013b9190611a28565b6103a9565b005b34801561014e57600080fd5b506101576104f9565b005b610173600480360381019061016e9190611ab6565b61082f565b005b34801561018157600080fd5b5061019c60048036038101906101979190611b08565b610a85565b005b6101a6610ca5565b005b3480156101b457600080fd5b506101bd610cc0565b6040516101ca91906120c3565b60405180910390f35b6101ed60048036038101906101e89190611a51565b610cca565b005b3480156101fb57600080fd5b50610204610ff5565b005b34801561021257600080fd5b5061022d600480360381019061022891906119ff565b61107d565b005b34801561023b57600080fd5b50610244611270565b005b34801561025257600080fd5b5061025b611272565b60405161026891906120de565b60405180910390f35b34801561027d57600080fd5b50610286611289565b6040516102939190611e06565b60405180910390f35b3480156102a857600080fd5b506102b16112b2565b6040516102be91906120c3565b60405180910390f35b3480156102d357600080fd5b506102ee60048036038101906102e991906119ff565b6112bc565b6040516102fb91906120c3565b60405180910390f35b34801561031057600080fd5b506103196113bd565b60405161032691906120c3565b60405180910390f35b61034960048036038101906103449190611ab6565b6113c7565b005b61035361155d565b005b34801561036157600080fd5b5061036a6115ce565b6040516103779190611e81565b60405180910390f35b34801561038c57600080fd5b506103a760048036038101906103a291906119ff565b61165c565b005b6103b16117ed565b73ffffffffffffffffffffffffffffffffffffffff166103cf611289565b73ffffffffffffffffffffffffffffffffffffffff1614610425576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161041c90612063565b60405180910390fd5b6002600960149054906101000a900460ff1660ff161461047a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161047190611f03565b60405180910390fd5b60008173ffffffffffffffffffffffffffffffffffffffff166108fc6006549081150290604051600060405180830381858888f193505050509050806104f5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104ec90612083565b60405180910390fd5b5050565b6003600960149054906101000a900460ff1660ff161461054e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161054590611f23565b60405180910390fd5b6000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054116105d0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105c790612023565b60405180910390fd5b61060e6040518060400160405280601581526020017f5374617274207769746864726177207265776172640000000000000000000000815250611754565b6000610619336112bc565b90506000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600033905060008173ffffffffffffffffffffffffffffffffffffffff166108fc600960159054906101000a900461ffff1661ffff16856007546106a491906121d5565b6106ae91906121a4565b9081150290604051600060405180830381858888f1935050505090508061070a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161070190612083565b60405180910390fd5b6000600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33600960159054906101000a900461ffff1661ffff168760085461076e91906121d5565b61077891906121a4565b6040518363ffffffff1660e01b8152600401610795929190611e58565b602060405180830381600087803b1580156107af57600080fd5b505af11580156107c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107e79190611a8d565b905080610829576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082090611f83565b60405180910390fd5b50505050565b6108376117ed565b73ffffffffffffffffffffffffffffffffffffffff16610855611289565b73ffffffffffffffffffffffffffffffffffffffff16146108ab576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108a290612063565b60405180910390fd5b6000600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b81526004016109089190611e06565b60206040518083038186803b15801561092057600080fd5b505afa158015610934573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109589190611adf565b90508082111561099d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161099490612043565b60405180910390fd5b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff1660e01b81526004016109fc93929190611e21565b602060405180830381600087803b158015610a1657600080fd5b505af1158015610a2a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a4e9190611a8d565b503460076000828254610a61919061214e565b925050819055508160086000828254610a7a919061214e565b925050819055505050565b610a8d6117ed565b73ffffffffffffffffffffffffffffffffffffffff16610aab611289565b73ffffffffffffffffffffffffffffffffffffffff1614610b01576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610af890612063565b60405180910390fd5b60028160ff161415610b7e576001600960149054906101000a900460ff1660ff1614610b62576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b5990612003565b60405180910390fd5b80600960146101000a81548160ff021916908360ff1602179055505b60038160ff161415610ca2576002600960149054906101000a900460ff1660ff161480610bbd57506001600960149054906101000a900460ff1660ff16145b610bfc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bf390612003565b60405180910390fd5b600060075411610c41576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c3890611f63565b60405180910390fd5b600060085411610c86576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c7d90611f63565b60405180910390fd5b80600960146101000a81548160ff021916908360ff1602179055505b50565b3460076000828254610cb7919061214e565b92505081905550565b6000600854905090565b610cd26117ed565b73ffffffffffffffffffffffffffffffffffffffff16610cf0611289565b73ffffffffffffffffffffffffffffffffffffffff1614610d46576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d3d90612063565b60405180910390fd5b600082905060008173ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b8152600401610d869190611e06565b60206040518083038186803b158015610d9e57600080fd5b505afa158015610db2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dd69190611adf565b905080831115610e1b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e1290612043565b60405180910390fd5b60008311610e5e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e5590611fc3565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff166323b872dd3330866040518463ffffffff1660e01b8152600401610e9b93929190611e21565b602060405180830381600087803b158015610eb557600080fd5b505af1158015610ec9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610eed9190611a8d565b506000600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205411610f99576003849080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b82600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610fe8919061214e565b9250508190555050505050565b610ffd6117ed565b73ffffffffffffffffffffffffffffffffffffffff1661101b611289565b73ffffffffffffffffffffffffffffffffffffffff1614611071576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161106890612063565b60405180910390fd5b61107b60006117f5565b565b6110856117ed565b73ffffffffffffffffffffffffffffffffffffffff166110a3611289565b73ffffffffffffffffffffffffffffffffffffffff16146110f9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110f090612063565b60405180910390fd5b6003600960149054906101000a900460ff1660ff161461114e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161114590611fe3565b60405180910390fd5b60008190508073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb611177611289565b600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518363ffffffff1660e01b81526004016111d4929190611e58565b602060405180830381600087803b1580156111ee57600080fd5b505af1158015611202573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112269190611a8d565b506000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505050565b565b6000600960149054906101000a900460ff16905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600654905090565b60006113446040518060400160405280600a81526020017f757365725f736861726500000000000000000000000000000000000000000000815250600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461133f6112b2565b6118b9565b6000600654600960159054906101000a900461ffff1661ffff16600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546113a891906121d5565b6113b291906121a4565b905080915050919050565b6000600754905090565b6001600960149054906101000a900460ff1660ff161461141c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161141390611fa3565b60405180910390fd5b600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205481111561149e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611495906120a3565b60405180910390fd5b80600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546114ed919061222f565b925050819055508060066000828254611506919061222f565b9250508190555060003390508073ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f19350505050158015611558573d6000803e3d6000fd5b505050565b34600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546115ac919061214e565b9250508190555034600660008282546115c5919061214e565b92505081905550565b6060600380548060200260200160405190810160405280929190818152602001828054801561165257602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611608575b5050505050905090565b6116646117ed565b73ffffffffffffffffffffffffffffffffffffffff16611682611289565b73ffffffffffffffffffffffffffffffffffffffff16146116d8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116cf90612063565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611748576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161173f90611f43565b60405180910390fd5b611751816117f5565b50565b6117ea816040516024016117689190611ea3565b6040516020818303038152906040527f41304fac000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611958565b50565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6119538383836040516024016118d193929190611ec5565b6040516020818303038152906040527f969cdd03000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611958565b505050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b60008135905061199081612668565b92915050565b6000813590506119a58161267f565b92915050565b6000815190506119ba81612696565b92915050565b6000813590506119cf816126ad565b92915050565b6000815190506119e4816126ad565b92915050565b6000813590506119f9816126c4565b92915050565b600060208284031215611a1157600080fd5b6000611a1f84828501611981565b91505092915050565b600060208284031215611a3a57600080fd5b6000611a4884828501611996565b91505092915050565b60008060408385031215611a6457600080fd5b6000611a7285828601611981565b9250506020611a83858286016119c0565b9150509250929050565b600060208284031215611a9f57600080fd5b6000611aad848285016119ab565b91505092915050565b600060208284031215611ac857600080fd5b6000611ad6848285016119c0565b91505092915050565b600060208284031215611af157600080fd5b6000611aff848285016119d5565b91505092915050565b600060208284031215611b1a57600080fd5b6000611b28848285016119ea565b91505092915050565b6000611b3d8383611b49565b60208301905092915050565b611b5281612263565b82525050565b611b6181612263565b82525050565b6000611b7282612109565b611b7c818561212c565b9350611b87836120f9565b8060005b83811015611bb8578151611b9f8882611b31565b9750611baa8361211f565b925050600181019050611b8b565b5085935050505092915050565b6000611bd082612114565b611bda818561213d565b9350611bea8185602086016122ca565b611bf38161235b565b840191505092915050565b6000611c0b602d8361213d565b9150611c168261236c565b604082019050919050565b6000611c2e60228361213d565b9150611c39826123bb565b604082019050919050565b6000611c5160268361213d565b9150611c5c8261240a565b604082019050919050565b6000611c74601f8361213d565b9150611c7f82612459565b602082019050919050565b6000611c9760148361213d565b9150611ca282612482565b602082019050919050565b6000611cba60228361213d565b9150611cc5826124ab565b604082019050919050565b6000611cdd600e8361213d565b9150611ce8826124fa565b602082019050919050565b6000611d0060238361213d565b9150611d0b82612523565b604082019050919050565b6000611d23601e8361213d565b9150611d2e82612572565b602082019050919050565b6000611d46601d8361213d565b9150611d518261259b565b602082019050919050565b6000611d69600e8361213d565b9150611d74826125c4565b602082019050919050565b6000611d8c60208361213d565b9150611d97826125ed565b602082019050919050565b6000611daf60128361213d565b9150611dba82612616565b602082019050919050565b6000611dd2600d8361213d565b9150611ddd8261263f565b602082019050919050565b611df1816122b3565b82525050565b611e00816122bd565b82525050565b6000602082019050611e1b6000830184611b58565b92915050565b6000606082019050611e366000830186611b58565b611e436020830185611b58565b611e506040830184611de8565b949350505050565b6000604082019050611e6d6000830185611b58565b611e7a6020830184611de8565b9392505050565b60006020820190508181036000830152611e9b8184611b67565b905092915050565b60006020820190508181036000830152611ebd8184611bc5565b905092915050565b60006060820190508181036000830152611edf8186611bc5565b9050611eee6020830185611de8565b611efb6040830184611de8565b949350505050565b60006020820190508181036000830152611f1c81611bfe565b9050919050565b60006020820190508181036000830152611f3c81611c21565b9050919050565b60006020820190508181036000830152611f5c81611c44565b9050919050565b60006020820190508181036000830152611f7c81611c67565b9050919050565b60006020820190508181036000830152611f9c81611c8a565b9050919050565b60006020820190508181036000830152611fbc81611cad565b9050919050565b60006020820190508181036000830152611fdc81611cd0565b9050919050565b60006020820190508181036000830152611ffc81611cf3565b9050919050565b6000602082019050818103600083015261201c81611d16565b9050919050565b6000602082019050818103600083015261203c81611d39565b9050919050565b6000602082019050818103600083015261205c81611d5c565b9050919050565b6000602082019050818103600083015261207c81611d7f565b9050919050565b6000602082019050818103600083015261209c81611da2565b9050919050565b600060208201905081810360008301526120bc81611dc5565b9050919050565b60006020820190506120d86000830184611de8565b92915050565b60006020820190506120f36000830184611df7565b92915050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b6000612159826122b3565b9150612164836122b3565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115612199576121986122fd565b5b828201905092915050565b60006121af826122b3565b91506121ba836122b3565b9250826121ca576121c961232c565b5b828204905092915050565b60006121e0826122b3565b91506121eb836122b3565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615612224576122236122fd565b5b828202905092915050565b600061223a826122b3565b9150612245836122b3565b925082821015612258576122576122fd565b5b828203905092915050565b600061226e82612293565b9050919050565b600061228082612293565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b838110156122e85780820151818401526020810190506122cd565b838111156122f7576000848401525b50505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000601f19601f8301169050919050565b7f4d75737420626520696e207374617465204c6f636b696e6720746f207769746860008201527f64726177207468652066756e6400000000000000000000000000000000000000602082015250565b7f4f6e6c792077697468647261776c61626c6520696e205265776172642070686160008201527f7365000000000000000000000000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f424e422072657761726420706f6f6c206d75737420686176652076616c756500600082015250565b7f4661696c656420746f2073656e6420546f6b656e000000000000000000000000600082015250565b7f4f6e6c7920776974686472617761626c6520696e2046756e64696e672070686160008201527f7365000000000000000000000000000000000000000000000000000000000000602082015250565b7f4d697373696e6720616d6f756e74000000000000000000000000000000000000600082015250565b7f4f6e6c7920776974686472617720636f76657220696e2052657761726420706860008201527f6173650000000000000000000000000000000000000000000000000000000000602082015250565b7f4c617374207374617465206d7573742062652046756e64696e67202831290000600082015250565b7f596f7520646f6e74206861766520424e4220746f207769746864726177000000600082015250565b7f62616c616e6365206973206c6f77000000000000000000000000000000000000600082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f4661696c656420746f2073656e6420424e420000000000000000000000000000600082015250565b7f6f7574206f6620616d6f756e7400000000000000000000000000000000000000600082015250565b61267181612263565b811461267c57600080fd5b50565b61268881612275565b811461269357600080fd5b50565b61269f81612287565b81146126aa57600080fd5b50565b6126b6816122b3565b81146126c157600080fd5b50565b6126cd816122bd565b81146126d857600080fd5b5056fea2646970667358221220e4dbc09d17151023e7b4a4a885e965ed059ca786396384b108c089889e8d13bf64736f6c63430008040033";

export class Morphling__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _bonus_percent: BigNumberish,
    _reward_token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Morphling> {
    return super.deploy(
      _bonus_percent,
      _reward_token,
      overrides || {}
    ) as Promise<Morphling>;
  }
  getDeployTransaction(
    _bonus_percent: BigNumberish,
    _reward_token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _bonus_percent,
      _reward_token,
      overrides || {}
    );
  }
  attach(address: string): Morphling {
    return super.attach(address) as Morphling;
  }
  connect(signer: Signer): Morphling__factory {
    return super.connect(signer) as Morphling__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MorphlingInterface {
    return new utils.Interface(_abi) as MorphlingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Morphling {
    return new Contract(address, _abi, signerOrProvider) as Morphling;
  }
}
