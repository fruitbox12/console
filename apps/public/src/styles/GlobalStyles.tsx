import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
      --light: #39147C;
      --dark: #071749;
      --white: white;
      --primary: #27B3FC;
      --glow: 2px 2px 30px 5px rgba(42, 179, 252, 0.4);
    }
  
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: "Roboto", sans-serif;
      font-size: 10px;
      letter-spacing: 0.08rem;
    }
  
    button {
      background: none;
      border: none;
      outline: none;
    }

    select {
      -webkit-appearance: none;
    }
  `;

function GlobalStyles() {
  return <GlobalStyle />;
}

export default GlobalStyles;
