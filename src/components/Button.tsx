import React from "react";
import styled from "styled-components";

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
    <ButtonContainer onClick={onClick} className="btn">
      {text.charAt(0).toUpperCase() + text.slice(1)}
    </ButtonContainer>
  );
};

export default Button;
