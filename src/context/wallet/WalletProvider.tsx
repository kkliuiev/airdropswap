import { FC, ReactNode, useMemo, useState } from 'react';
import { useAccount, useNetwork, useSigner } from 'wagmi';
import { Signer } from 'ethers';
import WalletContext from './WalletContext';

type WalletProviderProps = {
  children: ReactNode;
};

const WalletProvider: FC<WalletProviderProps> = (props) => {
  const { children } = props;
  const { chain } = useNetwork();
  const { address, connector, isConnected, isConnecting } = useAccount();
  const { data } = useSigner();
  const [isSigned, setIsSigned] = useState(false);

  const memoizedValue = useMemo(
    () => ({
      account: address,
      chain,
      signer: data as Signer,
      connector,
      isConnected,
      isConnecting,
      isSigned,
      setIsSigned,
    }),
    [
      address,
      isConnected,
      isConnecting,
      chain,
      connector,
      data,
      isSigned,
      setIsSigned,
    ]
  );

  return (
    <WalletContext.Provider value={memoizedValue}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
