import { FC, ReactElement } from 'react';
import { useWallet } from 'hooks';
import { Spinner, NotConnected, NotSupported } from 'components';
import { NotSigned } from 'components/NotConnected';

interface RequireWeb3Props {
  children: ReactElement;
}

const RequireWeb3: FC<RequireWeb3Props> = (props) => {
  const { children } = props;
  const { isConnecting, isConnected, isSigned, chain } = useWallet();

  if (!isConnected) {
    return <NotConnected />;
  }

  if (isConnecting) {
    return <Spinner />;
  }

  if (isConnected && chain?.unsupported) {
    return <NotSupported />;
  }

  if (!isSigned) {
    return <NotSigned />;
  }

  return children;
};

export default RequireWeb3;
