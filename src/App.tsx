import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Web3Modal } from '@web3modal/react';
import { ConfigProvider } from 'antd';
import {
  WagmiProvider,
  WalletProvider,
  ethereumClient,
  WALLET_CONNECT_PROJECT_ID,
} from 'context';
import { Content } from 'components';

const theme = {
  token: {
    fontFamily: 'Inter, sans-serif',
    colorPrimary: '#2d0d7b',
    colorPrimaryHover: '#2d0d7b90',
    colorFillContent: 'rgba(0, 0, 0, 0.25)',
  },
};

const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <WagmiProvider>
          <WalletProvider>
            <ConfigProvider theme={theme}>
              <Content />
            </ConfigProvider>
          </WalletProvider>
        </WagmiProvider>
      </BrowserRouter>

      <Web3Modal
        projectId={WALLET_CONNECT_PROJECT_ID}
        ethereumClient={ethereumClient}
        enableNetworkView
      />
    </>
  );
};

export default App;
