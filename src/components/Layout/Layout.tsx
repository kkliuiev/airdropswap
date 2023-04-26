import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Navbar } from 'components';
import styles from './Layout.module.scss';

const Layout: FC = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.layout__header}>
        <Navbar />
      </header>
      <main className={styles.layout__body}>
        <div className={styles.layout__content}>
          <Outlet />
        </div>
      </main>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default Layout;
