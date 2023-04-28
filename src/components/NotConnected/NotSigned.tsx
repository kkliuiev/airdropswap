import { FC } from 'react';
import { Button } from 'antd';
// import { useWallet } from 'hooks';
import styles from './NotConnected.module.scss';

const NotSigned: FC = () => {
  // const { isSigned, setIsSigned } = useWallet();
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h3 className={styles.container__title}>Airdrop is LIVE!</h3>
        <Button>Connect</Button>
      </div>
    </div>
  );
};

export default NotSigned;
