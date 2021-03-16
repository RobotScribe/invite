import React from 'react';
import { Input } from '@chakra-ui/input';
import { User } from '../../entities/user';
import { Container } from './Combobox.style';

export type Invite = string | User;

interface Props {
  users: User[];
  selectedItems: Invite[];
  onSelectItem: (item: Invite) => void;
  className?: string;
}

const Combobox: React.FC<Props> = ({ users, selectedItems, onSelectItem, className }) => {
  return (
    <Container className={className}>
      <Input fontSize="sm" color="white" opacity="0.3" placeholder="Search names or emails..." />
    </Container>
  );
};

export default Combobox;
