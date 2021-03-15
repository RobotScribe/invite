import React from 'react';

import { Button as ChakraButton } from "@chakra-ui/button"

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({ onClick, children }) => {
  return (
    <ChakraButton onClick={onClick} colorScheme="lightBlue">
      {children}
    </ChakraButton>
  );
};

export default Button;
