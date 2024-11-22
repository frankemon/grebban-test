import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Board from "./components/Board";
import Button from "./components/Button";
import Modal from "./components/Modal";

// Constants for board and testing solved state for modal popup
const COLS = 5;
const SOLVED = false;

// Returns new array of randomized tiles by swapping elements at random indices
// Fisher-Yates shuffle algorithm (Stackoverflow), which is better than sort which I previously used
// Better in the sense of true randomness and unbiased results (sort is prone to bias but probably fine for this use case (small data set))
const randomizeTiles: (tiles: number[]) => number[] = (tiles) => {
  // Create a copy of the initial tiles array to avoid mutating original array
  const randomized = [...tiles];
  // Loop from last element to first element, decrementing by 1 each iteration
  for (let i = randomized.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at indices i and j
    [randomized[i], randomized[j]] = [randomized[j], randomized[i]];
  }
  return randomized;
};

// Loop from 0 to tiles.length, if a tile is not in the correct position (i + 1), return false
// i + 1 because the tiles are 1-indexed
const checkIfSolved = (tiles: number[]) => {
  for (let i = 0; i < tiles.length - 1; i++) {
    if (tiles[i] !== i + 1) {
      return false;
    }
  }
  // Check if the last tile is 0
  return tiles[tiles.length - 1] === 0;
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

const NameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  font-size: 1rem;
  color: #000000;
`;

const App: React.FC = () => {
  // Initial state of tiles, including empty tile. Used for randomization and checking if puzzle is solved
  const [tiles, setTiles] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0,
  ]);
  // Track empty tile
  const [emptyTile, setEmptyTile] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (SOLVED) {
      // Set game to solved for testing and show modal
      setTiles(tiles);
      setEmptyTile(0);
      setShowModal(true);
    } else {
      // Normal game start with shallow copy of tiles array and randomize
      const shuffledTiles = randomizeTiles([...tiles]);
      setTiles(shuffledTiles);
    }
  }, []);

  // Randomize tiles and set empty tile to 0
  // Used in useEffect and button click
  const handleRandomize = () => {
    // Pass in initial tiles array and create new randomized array
    // This way we keep the initial array untouched and can re-use for reference or more randomizing
    const shuffledTiles = randomizeTiles([...tiles]);
    setTiles(shuffledTiles);
    setEmptyTile(0);
  };

  // Toggle modal visibility
  // Used in modal button click
  // Uses functional update instead of directly modifying state
  const handleShowModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  // Play again button click from modal
  // Randomize tiles and set empty tile to 0 and toggles modal visibility
  // Uses functional update instead of directly modifying state
  const handlePlayAgain = () => {
    setTiles((prevTiles) => randomizeTiles([...prevTiles]));
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const handleTileClick = (index: number) => {
    // Find index of empty tile in game tiles array
    const emptyTileIndex = tiles.indexOf(emptyTile);

    // Find row and column of empty tile
    // emptyTileRow = index of empty tile divided by number of columns
    // emptyTileCol = index of empty tile modulo number of columns
    const emptyTileRow = Math.floor(emptyTileIndex / COLS);
    const emptyTileCol = emptyTileIndex % COLS;

    // Find row and column of clicked tile
    // clickedTileRow = index of clicked tile divided by number of columns
    // clickedTileCol = index of clicked tile modulo number of columns
    const clickedTileRow = Math.floor(index / COLS);
    const clickedTileCol = index % COLS;

    // Check if clicked tile is next to empty tile, if not, do nothing
    if (clickedTileRow !== emptyTileRow && clickedTileCol !== emptyTileCol) {
      return;
    }

    // Make new array of game tiles
    const newTiles = [...tiles];

    // If both clicked and empty tile are in the same row, shift horizontally
    if (clickedTileRow === emptyTileRow) {
      // If clicked tile is to the left (has lower index) of empty tile, shift tiles right
      if (clickedTileCol < emptyTileCol) {
        // Shift tiles right
        // Start from empty tile, loop until clicked tile, decrement to shift tiles right
        for (let col = emptyTileCol; col > clickedTileCol; col--) {
          // Set current tile to the tile to the left for each iteration
          newTiles[emptyTileRow * COLS + col] =
            newTiles[emptyTileRow * COLS + col - 1];
        }
      } else if (clickedTileCol > emptyTileCol) {
        // Shift tiles left
        // Start from empty tile, loop until clicked tile, increment to shift tiles left
        for (let col = emptyTileCol; col < clickedTileCol; col++) {
          // Set current tile to the tile to the right for each iteration
          newTiles[emptyTileRow * COLS + col] =
            newTiles[emptyTileRow * COLS + col + 1];
        }
      }
      // Set clicked tile to empty tile
      newTiles[emptyTileRow * COLS + clickedTileCol] = emptyTile;

      // If both clicked and empty tile are in the same column, shift vertically
    } else if (clickedTileCol === emptyTileCol) {
      // If clicked tile is below (has higher index) empty tile, shift tiles up
      if (clickedTileRow < emptyTileRow) {
        // Shift tiles down
        // Start from empty tile, loop until clicked tile, decrement to shift tiles up
        for (let row = emptyTileRow; row > clickedTileRow; row--) {
          newTiles[row * COLS + emptyTileCol] =
            newTiles[(row - 1) * COLS + emptyTileCol];
        }
      } else if (clickedTileRow > emptyTileRow) {
        // Shift tiles up
        for (let row = emptyTileRow; row < clickedTileRow; row++) {
          newTiles[row * COLS + emptyTileCol] =
            newTiles[(row + 1) * COLS + emptyTileCol];
        }
      }
      // Set clicked tile to empty tile
      newTiles[clickedTileRow * COLS + emptyTileCol] = emptyTile;
    }

    // Set tiles to new array and set empty tile to clicked tile
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
        <NameContainer>Francois Hugo</NameContainer>
      </MainContainer>
    </>
  );
};

export default App;
