import Moralis from 'moralis';

// /* Moralis init code */
Moralis.start({ serverUrl: process.env.NEXT_PUBLIC_MOLARIS_SERVER_URL, appId: process.env.NEXT_PUBLIC_MOLARIS_APP_ID });

export const getTokenPrice = async (address: string) => {
  const options = {
    address: address,
    chain: process.env.NEXT_PUBLIC_NETWORK === 'MAINNET' ? "bsc" : 'bsc testnet',
    exchange: "PancakeSwapv2"
  };
  const price = await Moralis.Web3API.token.getTokenPrice(options as any);

  return price;
}

export const getUserTokensBalance = async (address: string, addressNeeded: string[] = []): Promise<number> => {
  const options = {
    address: address,
    chain: process.env.NEXT_PUBLIC_NETWORK === 'MAINNET' ? "bsc" : 'bsc testnet',
  };

  // TODO: Test net is not support token query
  const tokens = await Moralis.Web3API.account.getTokenBalances(options as any);
  console.log(tokens);
  const listTokenFilter = addressNeeded.map(address => address.toUpperCase())
  const listToken = await Promise.all(tokens.filter(tokenData => {
    if (addressNeeded.length) {
      return listTokenFilter.includes(tokenData.token_address.toUpperCase());
    }

    return true;
  }).map(async tokenData => {
    try {
      const price = await getTokenPrice(tokenData.token_address);
      console.log({ price })
      return {
        ...tokenData,
        price: price
      }
    } catch (error) {
      return false
    }
  }));

  console.log({ listToken })

  return 10;
  // return listToken.filter(_ => _).reduce((prev, cur) => {
  //   return prev + Number(cur.balance) * cur.price.usdPrice
  // }, 0);

}