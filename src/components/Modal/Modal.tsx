import { FC, ReactElement, ReactNode } from 'react';
import { Modal as AntdModal } from 'antd';
import styles from './Modal.module.scss';

interface ModalChildren {
  body: ReactNode | ReactElement;
  header?: ReactNode | ReactElement;
  footer?: ReactNode | ReactElement;
}

interface ModalProps {
  visible: boolean;
  onCancel: () => void;
  children: ModalChildren;
  centered?: boolean;
  width?: number;
  wrapClassName?: string;
}

const Modal: FC<ModalProps> = (props) => {
  const { visible, onCancel, children, width, centered, wrapClassName } = props;
  const { body, header = ' ', footer = ' ' } = children;

  return (
    <AntdModal
      open={visible}
      onCancel={onCancel}
      footer={footer}
      className={styles.modal}
      maskClosable={false}
      width={width}
      destroyOnClose
      title={header}
      centered={centered}
      wrapClassName={wrapClassName}
    >
      {body}
    </AntdModal>
  );
};

Modal.defaultProps = {
  width: 570,
  centered: true,
  wrapClassName: '',
};

export default Modal;
