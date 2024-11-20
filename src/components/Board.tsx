import React from "react";
import styled from "styled-components";
import Tile from "./Tile";

interface BoardProps {
  tiles: number[];
  onTileClick: (index: number) => void;
  cols: number;
}

// Use cols as a prop to change number of columns in the grid (controlled from App.tsx)
const BoardContainer = styled.div<{ cols: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.cols}, 1fr);
  gap: 0.1rem;
  padding: 0.2rem;
  margin-bottom: 1rem;
  background-color: #d3d3d3;
`;

const Board: React.FC<BoardProps> = ({ tiles, onTileClick, cols }) => {
  return (
    // Render board with tiles according to cols prop
    <BoardContainer cols={cols}>
      {/* Map and render tiles array with Tile component, each with number and onClick
      function (passes tile index up) from props (onTileClick from App.tsx) */}
      {tiles.map((tile, index) => (
        <Tile key={index} number={tile} onClick={() => onTileClick(index)} />
      ))}
    </BoardContainer>
  );
};

export default Board;
