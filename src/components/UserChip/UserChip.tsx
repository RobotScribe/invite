import React from 'react';
import { Container } from './UserChip.style';

interface Props {
  name: string;
  className?: string;
  size: number;
}

const UserChip: React.FC<Props> = ({ className, name, size }) => {
  return (
    <Container className={className} size={size}>
      {name.substring(0,1)}
    </Container>
  );
};

export default UserChip;
