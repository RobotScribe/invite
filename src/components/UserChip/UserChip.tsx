import React from 'react';
import { Container } from './UserChip.style';

interface Props {
  name: string;
  className?: string;
}

const UserChip: React.FC<Props> = ({ className, name }) => {
  return (
    <Container className={className}>
      {name.substring(0,1)}
    </Container>
  );
};

export default UserChip;
