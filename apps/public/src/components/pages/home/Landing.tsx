import React from "react";
import styled from "styled-components";
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

const Header = styled.h2`
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
  font-size: 1.9rem;
`;

const RightContainer = styled.div``;

const Landing = () => {
  return (
    <StyledLanding>
      <LeftContainer>
        <Header>Edge Cloud9</Header>
        <Description>
          Edge Cloud9 is a fully managed service that offers robust edge and
          cloud infrastructures and connects them together seamlessly. Process
          data locally for the ultimate in speed and security, then send only
          the data you want to the cloud for maximum flexibility.
        </Description>
      </LeftContainer>
      <RightContainer>
        <ServerAsset />
      </RightContainer>
    </StyledLanding>
  );
};

export default Landing;
