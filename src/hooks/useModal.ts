import { useState, useCallback } from 'react';

type VoidFunc = () => void;

const useModal = (
  initialState = false
): [boolean, VoidFunc, VoidFunc, VoidFunc] => {
  const [isOpen, setIsOpen] = useState(initialState);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return [isOpen, onOpen, onClose, onToggle];
};

export default useModal;
