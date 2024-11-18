import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Board from "./components/Board";
import Button from "./components/Button";
import randomizeTiles from "./hooks/randomizeTiles";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "Open Sans", sans-serif;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <Board />
        <Button text={"slumpa"} onClick={randomizeTiles} />
      </MainContainer>
    </>
  );
};

export default App;
