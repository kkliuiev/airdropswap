import { mainnet, bsc, polygon, Chain } from 'wagmi/chains';
import mainnetSrc from 'assets/icons/chain-eth-transparent.svg';
import bscSrc from 'assets/icons/chain-bsc-transparent.svg';
import polygonSrc from 'assets/icons/chain-matic-transparent.svg';

interface ExtendedChain extends Chain {
  icon?: string;
}

const extendedMainnet = {
  ...mainnet,
  icon: mainnetSrc,
};

const extendedBsc = {
  ...bsc,
  icon: bscSrc,
};

const extendedPolygon = {
  ...polygon,
  icon: polygonSrc,
};

const CONFIGURED_CHAINS: ExtendedChain[] = [
  extendedMainnet,
  extendedBsc,
  extendedPolygon,
];

const DEAFULT_CHAIN: ExtendedChain = extendedBsc;

export { CONFIGURED_CHAINS, DEAFULT_CHAIN };
export type { ExtendedChain };
