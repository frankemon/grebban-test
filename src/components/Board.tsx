import React from "react";
import styled from "styled-components";
import Tile from "./Tile";

const ROWS = 3;
const COLS = 5;
const TILES_AMOUNT = ROWS * COLS - 1;
//   grid-template-columns: repeat(${COLS}, 1fr);
{
  /* {Array.from({ length: TILES_AMOUNT }).map((_, index) => (
        <Tile key={index} number={index + 1} />
      ))} */
}
// const TILES_AMOUNT = 5;

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${COLS}, 1fr);
  gap: 0.1rem;
  padding: 0.2rem;
  margin-bottom: 1rem;
  background-color: #d3d3d3;
`;

interface BoardProps {
  tiles: number[];
}

const Board: React.FC<BoardProps> = ({ tiles }) => {
  return (
    <BoardContainer>
      {tiles.map((tile, index) =>
        tile === 0 ? null : <Tile key={index} number={tile} />
      )}
    </BoardContainer>
  );
};

export default Board;
