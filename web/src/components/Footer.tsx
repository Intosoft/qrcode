import styled from "styled-components";

import github from "../assets/icons/github.png";
import logo from "../assets/icons/logo.png";

const StyledFooter = styled.footer`
  height: 50px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2f2f2f;
`;

const Logo = styled.img`
  height: 34px;
`;

const Github = styled.img`
  height: 30px;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1200px;
`;
export const Footer = () => {
  return (
    <StyledFooter>
      <Content>
        <Logo src={logo} alt="Intosoft logo" />
        <a
          href="https://github.com/Intosoft/qrcode"
          target="_blank"
          rel="noreferrer"
        >
          <Github src={github} alt="Github logo" />
        </a>
      </Content>
    </StyledFooter>
  );
};
