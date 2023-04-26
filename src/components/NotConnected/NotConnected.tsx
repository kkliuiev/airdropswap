import { FC } from 'react';
import { Web3Button } from '@web3modal/react';
import styles from './NotConnected.module.scss';

const NotConnected: FC = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.container__title}>Airdrop is LIVE!</h3>
      <Web3Button
        label="Connect"
        avatar={undefined}
        balance={undefined}
        icon={undefined}
      />
    </div>
  );
};

export default NotConnected;
