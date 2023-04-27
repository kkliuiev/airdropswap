import { FC } from 'react';
import { Web3Button, Web3NetworkSwitch } from '@web3modal/react';
import { Col, Row } from 'antd';
import { useWallet } from 'hooks';
import logoSrc from 'assets/icons/logo.png';
import styles from './Navbar.module.scss';

const Navbar: FC = () => {
  const { isConnected } = useWallet();
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <img src={logoSrc} alt="logo" />
        <h2>3drops.xyz</h2>
      </div>
      <div className={styles.navbar__body}>
        <div className={styles.navbar__right}>
          <Row gutter={[16, 16]}>
            <Col className="gutter-row">
              <Row gutter={[16, 16]}>
                {isConnected && (
                  <Col className="gutter-row" flex={3}>
                    <Web3NetworkSwitch />
                  </Col>
                )}
                <Col className="gutter-row" flex={2}>
                  <Web3Button label="Connect" />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
