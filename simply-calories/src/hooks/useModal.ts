import { useState } from "react";

type UseModalReturnType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useModal = (): UseModalReturnType => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal };
};
