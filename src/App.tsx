import React, { useState } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { AppContainer } from './App.style';
import Button from './components/Button'
import InviteModal from './components/InviteModal';
import { Invite } from './components/Combobox/Combobox';

const App = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [existingInvites, setExistingInvites] = useState<Invite[]>([]);

    return (
        <AppContainer>
            <Button onClick={onOpen}>Invite teammates</Button>
            {existingInvites.map(invite => (
                <div key={JSON.stringify(invite)}>{JSON.stringify(invite)}</div>
            ))}
            <InviteModal
                existingInvites={existingInvites}
                addInvites={(invites: Invite[]) => {
                        setExistingInvites([...existingInvites, ...invites])
                    }
                }
                isOpen={isOpen}
                onClose={onClose}
            />
        </AppContainer>
    )
};

export default App;
