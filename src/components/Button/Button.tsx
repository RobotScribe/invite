import React from 'react';

import { Box } from '@chakra-ui/layout';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  isLight?: boolean;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({ onClick, children, isLight, disabled }) => {
  const getBackground = () => {
    if(disabled) return 'grey.750';
    return isLight ? "blue.300" : "blue.900";
  }

  const getHoverBackground = () => {
    if(disabled) return 'grey.750';
    return isLight ? "blue.400": "blue.500";
  }
  return (
    <Box
      disabled={disabled}
      opacity={disabled ? 0.3 : 1}
      onClick={onClick}
      as="button"
      bg={getBackground()}
      color={isLight ? "white" : "grey.500"}
      borderRadius="10"
      paddingX="5"
      paddingY="2"
      fontWeight="700"
      height="fit-content"
      cursor={disabled ? "inherit" : "pointer"}
      _hover={{ bg: getHoverBackground() }}
    >
      {children}
    </Box>
  );
};

export default Button;
