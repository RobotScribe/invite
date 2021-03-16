import styled from "styled-components";
import { colors } from "../../stylesheet";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid ${colors.grey[900]};
  border-radius: 10px;
  background-color: ${colors.blue[900]};
`;
Container.displayName = "Container";