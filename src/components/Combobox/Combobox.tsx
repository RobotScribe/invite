import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Input } from '@chakra-ui/input';
import { searchUser, User } from '../../entities/user';
import { Container, InputContainer, UserOptionContainer, UserOption, UserOptionName, Email, StyledInviteChip } from './Combobox.style';
import UserChip from '../UserChip';

export type Invite = string | User;

interface Props {
  selectedItems: Invite[];
  onSelectItem: (item: Invite) => void;
  onRemoveItem: (item: Invite) => void;
  className?: string;
}

const isEmail = (value: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value.toLowerCase());
}

export const isInviteEmail = (invite: Invite) => typeof invite === "string"

const getInviteName = (invite: Invite): string => {
  if (isInviteEmail(invite)) return invite as string;
  return (invite as User).firstName;
}

const getInviteEmail = (invite: Invite): string => {
  if (isInviteEmail(invite)) return invite as string;
  return (invite as User).email;
}

const Combobox: React.FC<Props> = ({ selectedItems, onSelectItem, className, onRemoveItem }) => {
  const [userOptions, setUserOptions] = useState<User[]>([]);
  const [value, setValue] = useState<string>("");

  const userIds = useMemo<(string | null)[]>(
    () => selectedItems.map(item => isInviteEmail(item) ? null : (item as User).id),
    [selectedItems]
  );

  const userEmails = useMemo<string[]>(
    () => selectedItems.map(getInviteEmail).concat(userOptions.map(user => user.email)),
    [selectedItems, userOptions]
  );

  const shouldDisplayInput = (value: string) => isEmail(value) && !userEmails.includes(value);


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
    searchUser(event.target.value).then(
      (users: User[]) => {
        const filteredUsers = users.filter(user => !userIds.includes(user.id))
        setUserOptions(filteredUsers)
      }
    )
  }

  const onOptionChoose = useCallback((option: Invite) => {
    setValue("");
    setUserOptions([]);
    onSelectItem(option);
  }, [onSelectItem])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();

        if(userOptions.length === 1) {
          onOptionChoose(userOptions[0]);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [userOptions, onOptionChoose]);

  return (
    <Container className={className}>
      <InputContainer>
        {selectedItems.map(item => (
          <StyledInviteChip
            key={getInviteEmail(item)}
            name={getInviteName(item)}
            leftIcon={isInviteEmail(item) ? <Email /> : <UserChip size={18} name={(item as User).firstName} />}
            onRemove={() => onRemoveItem(item)}
          />
        ))}
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
        {shouldDisplayInput(value) && (
          <UserOption onClick={() => onOptionChoose(value)}>
            <Email />
            <UserOptionName>
              {value}
            </UserOptionName>
          </UserOption>
        )}
        {userOptions.map(user => (
          <UserOption key={user.id} onClick={() => onOptionChoose(user)}>
            <UserChip size={24} name={user.firstName} />
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
