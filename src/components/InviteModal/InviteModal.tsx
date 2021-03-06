import React, { useState } from 'react';
import { User } from '../../entities/user';
import { Invite, isInviteEmail } from '../Combobox/Combobox';
import Modal from '../Modal'
import Button from '../Button'
import { ContentTitle, ContentDescription, FooterContainer, StyledCombobox } from './InviteModal.style';


interface Props {
  isOpen: boolean;
  onClose: () => void;
  existingInvites: Invite[];
  addInvites: (invites: Invite[]) => void;
}

const InviteModal: React.FC<Props> = ({ isOpen, onClose, existingInvites, addInvites }) => {
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

  const onInvite = () => {
    addInvites(invites);
    setInvites([]);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
          <ContentTitle>Email invite</ContentTitle>
          <ContentDescription>Send members an email invitation to join this workspace</ContentDescription>
          <FooterContainer>
              <StyledCombobox existingItems={existingInvites} onRemoveItem={onRemoveItem} selectedItems={invites} onSelectItem={onSelectInvite}/>
              <Button disabled={invites.length === 0} isLight onClick={onInvite}>Invite</Button>
          </FooterContainer>
      </div>
    </Modal>
  );
};

export default InviteModal;
