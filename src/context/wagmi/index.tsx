import { FC, ReactNode } from 'react';
import { createClient, configureChains, WagmiConfig } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { CONFIGURED_CHAINS } from 'config';

interface WagmiProviderProps {
  children: ReactNode;
}

const WALLET_CONNECT_PROJECT_ID = process.env
  .REACT_APP_WALLET_CONNECT_PROJECT_ID as string;
const INFURA_ID = process.env.REACT_APP_INFURA_ID as string;

const { chains, provider, webSocketProvider } = configureChains(
  CONFIGURED_CHAINS,
  [
    w3mProvider({ projectId: WALLET_CONNECT_PROJECT_ID }),
    infuraProvider({ apiKey: INFURA_ID, priority: 1 }),
    publicProvider({ priority: 2 }),
  ]
);

const wagmiClient = createClient({
  autoConnect: false,
  connectors: w3mConnectors({
    projectId: WALLET_CONNECT_PROJECT_ID,
    version: 1,
    chains,
  }),
  provider,
  webSocketProvider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

const WagmiProvider: FC<WagmiProviderProps> = (props) => {
  const { children } = props;
  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>;
};

export default WagmiProvider;
export { ethereumClient, WALLET_CONNECT_PROJECT_ID };
