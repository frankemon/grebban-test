import React from "react";
import styled from "styled-components";
import capatalizeText from "../utils/capitalizeText";

interface ModalProps {
  text: string;
  button: string;
  prompt: boolean;
  promptText: string;
  close: boolean;
  onClick: () => void;
  onClose: () => void;
  closeText: string;
}

const ModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 0.25rem;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const ModalButton = styled.button`
  background-color: #000000;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  user-select: none;
  box-shadow: none;
  outline: none;
  border: none;
  font-family: "Open Sans", sans-serif;
`;

const ModalButtonClose = styled.button`
  background-color: #000000;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  user-select: none;
  margin-left: 1rem;
  box-shadow: none;
  outline: none;
  border: none;
  font-family: "Open Sans", sans-serif;
`;

const Modal: React.FC<ModalProps> = ({
  text,
  button,
  close,
  prompt,
  promptText,
  onClick,
  onClose,
  closeText,
}) => {
  return (
    <ModalOverlay>
      <ModalBody>
        <h1>{capatalizeText(text)}</h1>
        {prompt && <p>{capatalizeText(promptText)}</p>}
        <ModalButtonContainer>
          <ModalButton onClick={onClick}>{capatalizeText(button)}</ModalButton>
          {close && (
            <ModalButtonClose onClick={onClose}>
              {capatalizeText(closeText)}
            </ModalButtonClose>
          )}
        </ModalButtonContainer>
      </ModalBody>
    </ModalOverlay>
  );
};

export default Modal;
