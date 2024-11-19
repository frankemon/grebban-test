import React from "react";
import styled from "styled-components";
import Tile from "./Tile";

interface BoardProps {
  tiles: number[];
  onTileClick: (index: number) => void;
  cols: number;
}

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
    <BoardContainer cols={cols}>
      {tiles.map((tile, index) => (
        <Tile key={index} number={tile} onClick={() => onTileClick(index)} />
      ))}
    </BoardContainer>
  );
};

export default Board;
