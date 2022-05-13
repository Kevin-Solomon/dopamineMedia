import React from 'react';
import { ShareSocial } from 'react-share-social';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
} from '@chakra-ui/react';
import { getIcons } from '../../util/getIcons';
function ShareModal({ isOpen, onClose, shareURL }) {
  const style = {
    paddingTop: '0px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0px',
    borderRadius: 3,
    margin: 0,
    border: 0,
    color: 'white',
  };
  const URL = window.location.href;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share To</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ShareSocial
            style={style}
            url={URL}
            socialTypes={['facebook', 'twitter', 'reddit', 'linkedin']}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ShareModal;
