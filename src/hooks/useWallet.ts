import { useContext } from 'react';
import { WalletContext, WalletContextProps } from 'context';

const useWallet = (): WalletContextProps => {
  const wallet = useContext(WalletContext);
  return wallet;
};

export default useWallet;
