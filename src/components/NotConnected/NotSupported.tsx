import { FC } from 'react';
import { Web3NetworkSwitch } from '@web3modal/react';
import { ReactComponent as NotSupportedIcon } from 'assets/icons/not-supported.svg';
import styles from './NotConnected.module.scss';

const NotSupported: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container__image}>
        <NotSupportedIcon />
      </div>
      <h3 className={styles.container__title}>Switch network</h3>
      <Web3NetworkSwitch />
    </div>
  );
};

export default NotSupported;
