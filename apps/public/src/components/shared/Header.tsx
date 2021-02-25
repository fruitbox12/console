import React from "react";
import styled from "styled-components";
import Button from "../../styles/Button";

const StyledHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10rem;
  padding: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h3`
  font-size: 2.3rem;
  font-weight: 500;
  color: var(--white);
  text-transform: capitalize;

  ::first-letter {
    color: var(--primary);
  }
`;

const NavContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

type NavItemProps = {
  active: boolean;
};

const NavItem = styled.a`
  height: 100%;
  cursor: pointer;
  padding: 0 2rem;
  font-size: 1.4rem;
  color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  text-decoration: ${(props: NavItemProps) =>
    props.active ? "underline" : "none"};

  :hover {
    color: var(--primary);
  }
`;

const ButtonContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  button:first-child {
    margin-right: 1rem;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <Logo>Edge Cloud9</Logo>
      <NavContainer>
        <NavItem active={true}>Home</NavItem>
        <NavItem active={false}>About</NavItem>
        <NavItem active={false}>Contact</NavItem>
      </NavContainer>
      <ButtonContainer>
        <Button>Sign In</Button>
      </ButtonContainer>
    </StyledHeader>
  );
};

export default Header;
