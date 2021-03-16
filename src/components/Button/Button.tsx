import React from 'react';

import { Box } from '@chakra-ui/layout';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  isLight?: boolean;
}

const Button: React.FC<Props> = ({ onClick, children, isLight }) => {
  return (
    <Box
      onClick={onClick}
      as="button"
      bg={isLight ? "blue.300" : "blue.900"}
      color={isLight ? "white" : "grey.500"}
      borderRadius="10"
      paddingX="5"
      paddingY="2"
      fontWeight="700"
      height="fit-content"
      _hover={{ bg: isLight ? "blue.400": "blue.500" }}
    >
      {children}
    </Box>
  );
};

export default Button;
