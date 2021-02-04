import React from "react";
import styled from "styled-components";
import { theme } from "../components/Theme";

const StyledHeader = styled.div`
  color: ${theme.colors.blue};
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  h2,
  p {
    margin: 0;
    padding: 0;
  }
`;

const EmailNoticeModal: React.FC<{}> = () => {
  return (
    <StyledHeader>
      <h2>Email verification is required</h2>
      <p>
        Account has been created, but email verification is required to add
        agency information.
      </p>
      <p>Please check your email inbox for a verification link.</p>
    </StyledHeader>
  );
};
export default EmailNoticeModal;
