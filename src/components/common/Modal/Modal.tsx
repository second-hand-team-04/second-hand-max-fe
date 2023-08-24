import { styled } from "styled-components";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
export default function Modal({
  isOpen,
  onClose, // Modal 밖(backdrop)을 클릭스시 닫기 위함.
  children,
}: Props) {
  if (!isOpen) return null;

  return (
    <StyledModal onClick={onClose}>
      {" "}
      <div>{children}</div>
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
