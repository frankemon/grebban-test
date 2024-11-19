import React from "react";
import styled from "styled-components";

interface TileProps {
  number: number;
  onClick: () => void;
}

const TileContainer = styled.div<{ $isEmpty: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  background-color: ${({ $isEmpty }) => ($isEmpty ? "transparent" : "#add9e6")};
  border: ${({ $isEmpty }) => ($isEmpty ? "none" : "1px solid #000000")};
  border-radius: 0.25rem;
  color: #000000;
  font-size: 2rem;
  font-weight: bold;
  cursor: ${({ $isEmpty }) => ($isEmpty ? "default" : "pointer")};
  user-select: none;
  @media (max-width: 600px) {
    width: 4rem;
    height: 4rem;
  }
`;

const Tile: React.FC<TileProps> = ({ number, onClick }) => {
  const isEmpty = number === 0;
  return (
    <TileContainer $isEmpty={isEmpty} onClick={isEmpty ? undefined : onClick}>
      {isEmpty ? "" : number}
    </TileContainer>
  );
};

export default Tile;
