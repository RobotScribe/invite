import styled from "styled-components";
import { colors } from "../../stylesheet";
import email from "../../icons/email.svg";
import InviteChip from '../InviteChip';

export const Container = styled.div`
  width: 100%;
  position: relative;
`;
Container.displayName = "Container";

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid ${colors.grey[900]};
  border-radius: 10px;
  background-color: ${colors.blue[900]};
`;
InputContainer.displayName = "InputContainer";

export const UserOptionContainer = styled.div`
  width: 100%;
  position: absolute;
  margin-top: 4px;
`;
UserOptionContainer.displayName = "UserOptionContainer";

export const UserOption = styled.button`
  border: 1px solid ${colors.grey[900]};
  background-color: ${colors.blue[900]};
  margin-top: 1px;
  width: 100%;
  outline: none;
  display: flex;
  align-items: center;
  padding: 15px;

  &:hover {
    border-color: ${colors.grey[750]};
  }
`;
UserOption.displayName = "UserOption";

export const UserOptionName = styled.div`
  margin-left: 10px;
  color: white;
  font-size: 12px;
`;
UserOptionName.displayName = "UserOptionName";

export const Email = styled.img.attrs({ src: email })`
  width: 15px;
  margin-left: 5px;
`;
Email.displayName = "Email";

export const StyledInviteChip = styled(InviteChip)`
  margin: 2px;
`
StyledInviteChip.displayName = "StyledInviteChip";
