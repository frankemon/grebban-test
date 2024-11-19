import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Board from "./components/Board";
import Button from "./components/Button";
import randomizeTiles from "./hooks/randomizeTiles";
import Modal from "./components/Modal";

// TODO: move fx
// TODO: check if solved fx and use on each move
// TODO: if solved, show modal with play again button
// TODO: get better randomize fx

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
  const [tiles, setTiles] = useState<number[]>([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  ]);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(true);

  useEffect(() => {
    setTiles(randomizeTiles([...tiles]));
  }, []);

  const handleRandomize = () => {
    setTiles(randomizeTiles([...tiles]));
  };

  const handleShowModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const handlePlayAgain = () => {
    setTiles((prevTiles) => randomizeTiles([...prevTiles]));
    setShowModal((prevShowModal) => !prevShowModal);
  };

  return (
    <>
      <GlobalStyle />
      {showModal && (
        <Modal
          text={"Bra jobbat, du har löst pusslet!"}
          prompt={true}
          promptText={"Vill du spela igen?"}
          button={"Spela igen"}
          onClick={handlePlayAgain}
          close={true}
          onClose={handleShowModal}
        />
      )}
      <MainContainer>
        <Board tiles={tiles} />
        <Button text={"slumpa"} onClick={handleRandomize} />
      </MainContainer>
    </>
  );
};

export default App;
