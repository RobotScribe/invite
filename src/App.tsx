import React from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { AppContainer, ContentTitle, ContentDescription } from './App.style';
import Button from './components/Button'
import Modal from './components/Modal'

const App = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <AppContainer>
            <Button onClick={onOpen}>Invite teammates</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <div>
                    <ContentTitle>Email invite</ContentTitle>
                    <ContentDescription>Send members an email invitation to join this workspace</ContentDescription>
                </div>
            </Modal>
        </AppContainer>
    )
};

export default App;
