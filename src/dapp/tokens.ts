export const TOKENS = process.env.NEXT_PUBLIC_NETWORK === 'MAINNET' ? {
  BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  USDT: '0x55d398326f99059ff775485246999027b3197955',
  CAKE: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
} : {
  BUSD: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee'
}
