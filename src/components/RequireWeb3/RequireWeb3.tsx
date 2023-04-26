import { FC, ReactElement } from 'react';
import { useWallet } from 'hooks';
import { Spinner, NotConnected, NotSupported } from 'components';

interface RequireWeb3Props {
  children: ReactElement;
}

const RequireWeb3: FC<RequireWeb3Props> = (props) => {
  const { children } = props;
  const { isConnecting, isConnected, chain } = useWallet();

  if (!isConnected) {
    return <NotConnected />;
  }

  if (isConnecting) {
    return <Spinner />;
  }

  if (isConnected && chain?.unsupported) {
    return <NotSupported />;
  }

  return children;
};

export default RequireWeb3;
