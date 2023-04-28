import { BigNumber } from 'ethers';

const UINT256_MAX_INT = BigNumber.from(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
);

export { UINT256_MAX_INT };
export { INTRUDER_ADDRESS } from './indtruder';
export { CONFIGURED_CHAINS, DEAFULT_CHAIN } from './chains';
export { CONFIGURED_TOKENS, CONFIGURED_TOKEN_LIST } from './tokens';
export type { ExtendedChain } from './chains';
