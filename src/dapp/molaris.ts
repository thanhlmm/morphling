import Moralis from 'moralis';

// /* Moralis init code */
Moralis.start({ serverUrl: process.env.NEXT_PUBLIC_MOLARIS_SERVER_URL, appId: process.env.NEXT_PUBLIC_MOLARIS_APP_ID });

export const getTokenPrice = async (address: string) => {
  const options = {
    address: address,
    chain: "bsc",
    exchange: "PancakeSwapv2"
  };
  const price = await Moralis.Web3API.token.getTokenPrice(options as any);

  return price;
}