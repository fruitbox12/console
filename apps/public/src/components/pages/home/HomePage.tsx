import React from "react";
import styled from "styled-components";
import Landing from "./Landing";

const StyleHomePage = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const HomePage = () => {
  return (
    <StyleHomePage>
      <Landing />
    </StyleHomePage>
  );
};

export default HomePage;
