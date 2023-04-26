import { FC } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './Spinner.module.scss';

type SpinnerSize = 'small' | 'medium' | 'large' | 'x_small';

interface SpinnerProps {
  size?: SpinnerSize;
}

const Spinner: FC<SpinnerProps> = (props) => {
  const { size } = props;

  let fontSize = 50;

  if (size === 'small') {
    fontSize = 25;
  } else if (size === 'large') {
    fontSize = 75;
  } else if (size === 'x_small') {
    fontSize = 16;
  }
  const antIcon = <LoadingOutlined spin style={{ fontSize }} />;
  return (
    <div className={styles.spinner}>
      <Spin indicator={antIcon} className={styles.spinner__elemnet} />
    </div>
  );
};

Spinner.defaultProps = {
  size: 'medium',
};

export default Spinner;
