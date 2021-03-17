import React from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { AppContainer } from './App.style';
import Button from './components/Button'
import InviteModal from './components/InviteModal';

const App = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <AppContainer>
            <Button onClick={onOpen}>Invite teammates</Button>
            <InviteModal isOpen={isOpen} onClose={onClose}/>
        </AppContainer>
    )
};

export default App;
