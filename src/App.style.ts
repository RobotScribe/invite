import styled from "styled-components";
import { colors } from "./stylesheet";
import Combobox from "./components/Combobox";

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
  color: ${colors.grey[700]};
  margin-bottom: 24px;
`;
ContentDescription.displayName = "ContentDescription";

export const FooterContainer = styled.div`
  display: flex;
  align-items: center;
`;
FooterContainer.displayName = "FooterContainer";

export const StyledCombobox = styled(Combobox)`
  flex: 1;
  margin-right: 16px;
  width: 300px;
`;
StyledCombobox.displayName = "StyledCombobox";
