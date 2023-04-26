import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import classNames from 'classnames';
import { useWallet } from 'hooks';
import { Airdrop, Layout, RequireWeb3 } from 'components';

import styles from './Content.module.scss';

const Content: FC = () => {
  const { isConnecting } = useWallet();

  const containerClassName = classNames({
    [styles.container]: true,
    [styles.container_loading]: isConnecting,
  });

  return (
    <div className={containerClassName}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <RequireWeb3>
                <Airdrop />
              </RequireWeb3>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Content;
