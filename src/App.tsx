import React, { useState } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { AppContainer, ContentTitle, ContentDescription, FooterContainer, StyledCombobox } from './App.style';
import Button from './components/Button'
import Modal from './components/Modal'
import { Invite } from './components/Combobox/Combobox';


const App = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [invites, setInvites] = useState<Invite[]>([]);

    const onSelectInvite = (invite: Invite) => {
        setInvites([...invites, invite]);
    }

    return (
        <AppContainer>
            <Button onClick={onOpen}>Invite teammates</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <div>
                    <ContentTitle>Email invite</ContentTitle>
                    <ContentDescription>Send members an email invitation to join this workspace</ContentDescription>
                    <FooterContainer>
                        <StyledCombobox selectedItems={invites} onSelectItem={onSelectInvite}/>
                        <Button isLight onClick={() => console.log(invites)}>Invite</Button>
                    </FooterContainer>
                </div>
            </Modal>
        </AppContainer>
    )
};

export default App;
