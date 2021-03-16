import styled from "styled-components";
import { colors } from "../../stylesheet";

export const Container = styled.div`
  border-radius: 10px;
  padding: 2px 12px;
  border: 1px solid ${colors.pink[500]};
  display: flex;
  align-items: center;
`;
Container.displayName = "Container";

export const Name = styled.div`
  color: ${colors.pink[500]};
  margin: 0 8px;
  font-size: 11px;
`;
Name.displayName = "Name";
