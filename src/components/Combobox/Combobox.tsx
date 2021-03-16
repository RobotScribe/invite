import React, { ChangeEvent, useState } from 'react';
import { Input } from '@chakra-ui/input';
import { searchUser, User } from '../../entities/user';
import { Container, InputContainer, UserOptionContainer, UserOption, UserOptionName } from './Combobox.style';
import UserChip from '../UserChip';

export type Invite = string | User;

interface Props {
  selectedItems: Invite[];
  onSelectItem: (item: Invite) => void;
  className?: string;
}

const Combobox: React.FC<Props> = ({ selectedItems, onSelectItem, className }) => {
  const [userOptions, setUserOptions] = useState<User[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    searchUser(event.target.value).then(
      (users: User[]) => setUserOptions(users)
    )
  }

  return (
    <Container className={className}>
      <InputContainer>
        <Input
          onChange={handleChange}
          fontSize="sm"
          color="white"
          opacity="0.3"
          placeholder="Search names or emails..."
          _hover={{ borderColor: "grey.700" }}
        />
      </InputContainer>
      <UserOptionContainer>
        {userOptions.map(user => (
          <UserOption>
            <UserChip name={user.firstName} />
            <UserOptionName>
              {user.firstName}
            </UserOptionName>
          </UserOption>
        ))}
      </UserOptionContainer>
    </Container>
  );
};

export default Combobox;
