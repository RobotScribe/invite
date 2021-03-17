import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Input } from '@chakra-ui/input';
import { useDebouncedSearch } from '../../services/useDebouncedSearch';
import { searchUser, User } from '../../entities/user';
import { Container, InputContainer, UserOptionContainer, UserOption, UserOptionName, Email, StyledInviteChip } from './Combobox.style';
import UserChip from '../UserChip';

export type Invite = string | User;

interface Props {
  selectedItems: Invite[];
  existingItems: Invite[];
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

const Combobox: React.FC<Props> = ({ selectedItems, onSelectItem, className, onRemoveItem, existingItems }) => {
  const [userOptions, setUserOptions] = useState<User[]>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const useSearchUsers = () =>
  useDebouncedSearch((value: string) => {
    searchUser(value).then(
      (users: User[]) => {
        setUserOptions(users);
      }
    )
  });
  const { value, setValue } = useSearchUsers();

  const userIds = useMemo<(string | null)[]>(
    () => selectedItems.map(item => isInviteEmail(item) ? null : (item as User).id),
    [selectedItems]
  );

  const invitedUserIds = useMemo<(string | null)[]>(
    () => existingItems.map(item => isInviteEmail(item) ? null : (item as User).id),
    [existingItems]
  );

  const filteredOptions = useMemo(
    () => userOptions.filter(user => !userIds.concat(invitedUserIds).includes(user.id)),
    [userOptions, userIds, invitedUserIds]
  )

  useEffect(() => {
    setHoverIndex(null);
  }, [filteredOptions.length]);

  const userEmails = useMemo<string[]>(
    () => selectedItems.concat(existingItems).map(getInviteEmail).concat(filteredOptions.map(user => user.email)),
    [selectedItems, filteredOptions, existingItems]
  );

  const shouldDisplayInput = useCallback(
    () => isEmail(value) && !userEmails.includes(value),
    [userEmails, value]
  );

  const numberOfDisplayedOptions = shouldDisplayInput() ? 1 : filteredOptions.length;

  const onOptionChoose = useCallback((option: Invite) => {
    setValue("");
    setUserOptions([]);
    onSelectItem(option);
  }, [onSelectItem, setValue])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (numberOfDisplayedOptions === 1) {
          onOptionChoose(shouldDisplayInput() ? value : filteredOptions[0]);
        }
        if (numberOfDisplayedOptions > 1 && hoverIndex !== null) {
          onOptionChoose(filteredOptions[hoverIndex]);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [filteredOptions, onOptionChoose, value, shouldDisplayInput, numberOfDisplayedOptions, hoverIndex]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Backspace') {
        if(value.length === 0 && selectedItems.length > 0) {
          onRemoveItem(selectedItems[selectedItems.length - 1]);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [selectedItems, onRemoveItem, value]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (hoverIndex !== null) {
          setHoverIndex(Math.max(hoverIndex - 1, 0));
        }
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (hoverIndex === null && numberOfDisplayedOptions > 0) {
          setHoverIndex(0);
        } else if (hoverIndex !== null) {
          setHoverIndex(Math.min(hoverIndex + 1, numberOfDisplayedOptions - 1));
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [filteredOptions, hoverIndex, numberOfDisplayedOptions]);

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
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          fontSize="sm"
          color="white"
          opacity="0.6"
          placeholder="Search names or emails..."
          _hover={{ borderColor: "grey.700" }}
        />
      </InputContainer>
      <UserOptionContainer>
        {shouldDisplayInput() ? (
          <UserOption hovered={hoverIndex === 0} onClick={() => onOptionChoose(value)}>
            <Email />
            <UserOptionName>
              {value}
            </UserOptionName>
          </UserOption>
        ) : filteredOptions.map((user, index) => (
          <UserOption hovered={index === hoverIndex} key={user.id} onClick={() => onOptionChoose(user)}>
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
