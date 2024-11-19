import React from "react";
import styled from "styled-components";

const TileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  background-color: #add9e6;
  border: 1px solid #000000;
  border-radius: 0.25rem;
  color: #000000;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  @media (max-width: 600px) {
    width: 4rem;
    height: 4rem;
  }
`;

interface TileProps {
  number: number;
}

const Tile: React.FC<TileProps> = ({ number }) => {
  const checkTilePosition = () => {
    console.log("checkTilePosition", number);
  };
  return <TileContainer onClick={checkTilePosition}>{number}</TileContainer>;
};

export default Tile;
