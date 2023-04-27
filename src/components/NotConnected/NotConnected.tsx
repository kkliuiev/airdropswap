import { FC } from 'react';
import { Web3Button } from '@web3modal/react';
import styles from './NotConnected.module.scss';

const NotConnected: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h3 className={styles.container__title}>Airdrop is LIVE!</h3>
        <Web3Button label="Connect" />
      </div>
    </div>
  );
};

export default NotConnected;
