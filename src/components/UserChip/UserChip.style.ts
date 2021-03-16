import styled from "styled-components";
import { colors } from "../../stylesheet";

export const Container = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: ${colors.pink[500]};
  color: white;
`;
Container.displayName = "Container";
