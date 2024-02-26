import styled from "styled-components";

import github from "../assets/icons/github.png";
import logo from "../assets/icons/logo.png";

const StyledHeader = styled.header`
  height: 50px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ebeff3;
`;

const Logo = styled.img`
  height: 34px;
`;

const Github = styled.img`
  height: 30px;
`;

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  return (
    <StyledHeader>
      <Logo src={logo} alt="Intosoft logo" />
      <a
        href="https://github.com/Intosoft/qrcode"
        target="_blank"
        rel="noreferrer"
      >
        <Github src={github} alt="Github logo" />
      </a>
    </StyledHeader>
  );
};
