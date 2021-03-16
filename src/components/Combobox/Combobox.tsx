import React, { ChangeEvent, useState } from 'react';
import { Input } from '@chakra-ui/input';
import { searchUser, User } from '../../entities/user';
import { Container, InputContainer, UserOptionContainer, UserOption, UserOptionName, Email } from './Combobox.style';
import UserChip from '../UserChip';

export type Invite = string | User;

interface Props {
  selectedItems: Invite[];
  onSelectItem: (item: Invite) => void;
  className?: string;
}

const isEmail = (value: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value.toLowerCase());
}

const Combobox: React.FC<Props> = ({ selectedItems, onSelectItem, className }) => {
  const [userOptions, setUserOptions] = useState<User[]>([]);
  const [value, setValue] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
    searchUser(event.target.value).then(
      (users: User[]) => setUserOptions(users)
    )
  }

  return (
    <Container className={className}>
      <InputContainer>
        <Input
          value={value}
          onChange={handleChange}
          fontSize="sm"
          color="white"
          opacity="0.6"
          placeholder="Search names or emails..."
          _hover={{ borderColor: "grey.700" }}
        />
      </InputContainer>
      <UserOptionContainer>
        {isEmail(value) && (
          <UserOption>
            <Email />
            <UserOptionName>
              {value}
            </UserOptionName>
          </UserOption>
        )}
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
