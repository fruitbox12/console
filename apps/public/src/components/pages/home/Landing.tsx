import React from "react";
import styled from "styled-components";
import Button from "../../../styles/Button";
import ServerAsset from "./server-asset/ServerAsset";

const StyledLanding = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(-125deg, var(--light), var(--dark));
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  font-size: 25rem;
  line-height: 0.85;
  color: var(--white);
  font-weight: 900;
  text-transform: uppercase;
`;

const SubHeader = styled.h2`
  font-size: 10.6rem;
  line-height: 0.8;
  color: var(--white);
  text-transform: uppercase;
`;

const Description = styled.h3`
  max-width: 61.5rem;
  color: grey;
  margin-top: 1rem;
  padding: 1rem;
  font-size: 1.3rem;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  margin-top: 3rem;
  margin-left: 1rem;
`;

const RightContainer = styled.div``;

const Landing = () => {
  return (
    <StyledLanding>
      <LeftContainer>
        <Header>Edge</Header>
        <SubHeader>Cloud Nine</SubHeader>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </Description>
        <Buttons>
          <Button primary mega>
            request demo
          </Button>
        </Buttons>
      </LeftContainer>
      <RightContainer>
        <ServerAsset />
      </RightContainer>
    </StyledLanding>
  );
};

export default Landing;
