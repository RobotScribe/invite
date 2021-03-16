import React from 'react';
import { CloseButton } from "@chakra-ui/react"
import { Container, Name } from './InviteChip.style';


interface Props {
  name: string;
  leftIcon: React.ReactNode;
  onRemove: () => void;
  className?: string;
}

const ButtonWithIcons: React.FC<Props> = ({ name, leftIcon, onRemove, className }) => {
  return (
    <Container className={className}>
      {leftIcon}
      <Name>
        {name}
      </Name>
      <CloseButton color="pink.500" onClick={onRemove} size="sm" />
    </Container>
  );
};

export default ButtonWithIcons;
