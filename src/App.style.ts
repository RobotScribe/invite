import styled from "styled-components";
import { colors } from "./stylesheet";

export const AppContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;
AppContainer.displayName = "AppContainer";

export const ContentTitle = styled.div`
  color: ${colors.grey[500]};
  margin-bottom: 12px;
`;
ContentTitle.displayName = "ContentTitle";

export const ContentDescription = styled.div`
  color: ${colors.grey[900]};
`;
ContentDescription.displayName = "ContentDescription";
