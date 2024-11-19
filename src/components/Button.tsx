import React from "react";
import styled from "styled-components";
import capatalizeText from "../utils/capitalizeText";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const ButtonContainer = styled.div`
  background-color: #000000;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  user-select: none;
`;

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <ButtonContainer onClick={onClick}>{capatalizeText(text)}</ButtonContainer>
  );
};

export default Button;
