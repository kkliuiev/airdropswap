import { FC } from 'react';
import { Web3NetworkSwitch } from '@web3modal/react';
import styles from './NotConnected.module.scss';

const NotSupported: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h3 className={styles.container__title}>Switch network</h3>
        <Web3NetworkSwitch />
      </div>
    </div>
  );
};

export default NotSupported;
