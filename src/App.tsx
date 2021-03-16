import React, { useState } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { AppContainer, ContentTitle, ContentDescription, FooterContainer, StyledCombobox } from './App.style';
import Button from './components/Button'
import Modal from './components/Modal'
import { Invite, isInviteEmail } from './components/Combobox/Combobox';
import { User } from './entities/user';


const App = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [invites, setInvites] = useState<Invite[]>([]);

    const onSelectInvite = (invite: Invite) => {
        setInvites([...invites, invite]);
    }



  const onRemoveItem = (item: Invite) => {
    if (isInviteEmail(item)) {
      setInvites(invites.filter(invite => invite !== item));
      return;
    }
    setInvites(invites.filter(invite => (invite as User).id !== (item as User).id));
}

    return (
        <AppContainer>
            <Button onClick={onOpen}>Invite teammates</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <div>
                    <ContentTitle>Email invite</ContentTitle>
                    <ContentDescription>Send members an email invitation to join this workspace</ContentDescription>
                    <FooterContainer>
                        <StyledCombobox onRemoveItem={onRemoveItem} selectedItems={invites} onSelectItem={onSelectInvite}/>
                        <Button isLight onClick={() => console.log(invites)}>Invite</Button>
                    </FooterContainer>
                </div>
            </Modal>
        </AppContainer>
    )
};

export default App;
