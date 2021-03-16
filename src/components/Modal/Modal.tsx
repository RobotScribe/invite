import React from 'react';

import { Modal as ChakraModal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';

interface Props {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ onClose, isOpen, children }) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalHeader>Modal Title</ModalHeader>
      <ModalContent width="none" maxWidth="none" margin="auto" padding="16" bg="blue.500">
          <ModalHeader fontWeight="normal" fontSize="2xl" padding="0" color="grey.500" margin="auto">Invite members</ModalHeader>
          <ModalBody paddingX="0" paddingTop="8">
              {children}
          </ModalBody>
      </ModalContent>
  </ChakraModal>
  );
};

export default Modal;
