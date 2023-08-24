import { styled } from "styled-components";

type Props = {
  header: React.ReactNode;
  body: React.ReactNode;
};
export default function Modal({ header, body }: Props) {
  return (
    <StyledModal>
      <ModalHeader>{header}</ModalHeader>
      <ModalBody>{body}</ModalBody>
    </StyledModal>
  );
}

const StyledModal = styled.div`
  display: flex;
  flex-direction: column;

  width: 320px;
  height: 700px;
  border-radius: 16px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme: { color } }) => color.neutral.background};
  overflow: hidden;
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 72px;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
