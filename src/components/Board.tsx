import React from "react";
import styled from "styled-components";
import Tile from "./Tile";

const ROWS = 3;
const COLS = 5;
const TILES_AMOUNT = ROWS * COLS - 1;
//   grid-template-columns: repeat(${COLS}, 1fr);

// const TILES_AMOUNT = 5;

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${COLS}, 1fr);
  gap: 0.1rem;
  padding: 0.2rem;
  margin-bottom: 1rem;
  background-color: #d3d3d3;
`;

const Board: React.FC = () => {
  return (
    <BoardContainer>
      {Array.from({ length: TILES_AMOUNT }).map((_, index) => (
        <Tile key={index} number={index + 1} />
      ))}
    </BoardContainer>
  );
};

export default Board;
