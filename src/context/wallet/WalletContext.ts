import { createContext } from 'react';
import { Signer } from 'ethers';
import { ExtendedChain } from 'config';

type WalletContextProps = {
  account?: `0x${string}`;
  chain?: ExtendedChain & {
    unsupported?: boolean | undefined;
  };
  signer?: Signer;
  isConnected: boolean;
  isConnecting: boolean;
  isSigned: boolean;
};

const initialContext = {
  isConnected: false,
  isConnecting: false,
  isSigned: false,
};

const WalletContext = createContext<WalletContextProps>(initialContext);

export default WalletContext;
export type { WalletContextProps };
