import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Board from "./components/Board";
import Button from "./components/Button";
import Modal from "./components/Modal";

// TODO: get better randomize fx

const COLS = 5;
const SOLVED = false;

const randomizeTiles: (tiles: number[]) => number[] = (tiles) => {
  const randomized = tiles.sort(() => Math.random() - 0.5);
  return randomized;
};

const checkIfSolved = (tiles: number[]) => {
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] !== i + 1) {
      return false;
    }
  }
  return true;
};

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
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0,
  ]);
  const [emptyTile, setEmptyTile] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (SOLVED) {
      // Set game to solved for testing
      setTiles(tiles);
      setEmptyTile(0);
      setShowModal(true);
    } else {
      // Normal game start
      const shuffledTiles = randomizeTiles([...tiles]);
      setTiles(shuffledTiles);
    }
  }, []);

  const handleRandomize = () => {
    const shuffledTiles = randomizeTiles([...tiles]);
    setTiles(shuffledTiles);
    setEmptyTile(0);
  };

  const handleShowModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const handlePlayAgain = () => {
    setTiles((prevTiles) => randomizeTiles([...prevTiles]));
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const handleTileClick = (index: number) => {
    const emptyTileIndex = tiles.indexOf(emptyTile);
    const emptyRow = Math.floor(emptyTileIndex / COLS);
    const emptyCol = emptyTileIndex % COLS;
    const tileRow = Math.floor(index / COLS);
    const tileCol = index % COLS;

    const newTiles = [...tiles];

    if (tileRow === emptyRow) {
      // Horizontal shift
      if (tileCol < emptyCol) {
        // Shift right
        for (let col = emptyCol; col > tileCol; col--) {
          newTiles[emptyRow * COLS + col] = newTiles[emptyRow * COLS + col - 1];
        }
      } else if (tileCol > emptyCol) {
        // Shift left
        for (let col = emptyCol; col < tileCol; col++) {
          newTiles[emptyRow * COLS + col] = newTiles[emptyRow * COLS + col + 1];
        }
      }
      newTiles[emptyRow * COLS + tileCol] = emptyTile;
    } else if (tileCol === emptyCol) {
      // Vertical shift
      if (tileRow < emptyRow) {
        // Shift down
        for (let row = emptyRow; row > tileRow; row--) {
          newTiles[row * COLS + emptyCol] =
            newTiles[(row - 1) * COLS + emptyCol];
        }
      } else if (tileRow > emptyRow) {
        // Shift up
        for (let row = emptyRow; row < tileRow; row++) {
          newTiles[row * COLS + emptyCol] =
            newTiles[(row + 1) * COLS + emptyCol];
        }
      }
      newTiles[tileRow * COLS + emptyCol] = emptyTile;
    }

    setTiles(newTiles);
    setEmptyTile(newTiles[index]);

    if (checkIfSolved(newTiles)) {
      setShowModal(true);
    }
  };

  return (
    <>
      <GlobalStyle />
      {showModal && (
        <Modal
          text={"bra jobbat, du har löst pusslet!"}
          prompt={true}
          promptText={"vill du spela igen?"}
          button={"spela igen"}
          onClick={handlePlayAgain}
          close={true}
          onClose={handleShowModal}
          closeText={"stäng"}
        />
      )}
      <MainContainer>
        <Board tiles={tiles} onTileClick={handleTileClick} cols={COLS} />
        <Button text={"slumpa"} onClick={handleRandomize} />
      </MainContainer>
    </>
  );
};

export default App;
