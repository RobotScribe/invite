import styled from "styled-components";
import { colors } from "../../stylesheet";

export const Container = styled.div<{ size: number }>`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  font-size: ${({size}) => (2 * size / 3)}px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.pink[500]};
  color: white;
`;
Container.displayName = "Container";
