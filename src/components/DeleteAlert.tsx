import styled from "styled-components";
import { Alert } from "./common/Alert";
import Button from "./common/Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export default function DeleteAlert({ onClose, onDelete }: Props) {
  return (
    <>
      <Alert>
        <AlertBody>
          <DeleteAlertTitle>
            등록한 상품을 정말로 삭제하시겠어요?
          </DeleteAlertTitle>
        </AlertBody>
        <AlertBody>
          <AlertButtonContainer>
            <Button
              style={{ textAlign: "center", padding: 0 }}
              onClick={onClose}
              variant="plain">
              취소
            </Button>
            <Button style={{ padding: 0 }} onClick={onDelete} variant="plain">
              <span>삭제</span>
            </Button>
          </AlertButtonContainer>
        </AlertBody>
      </Alert>
    </>
  );
}
const AlertBody = styled.div`
  padding: 24px 32px;
  width: 100%;
  display: flex;
  box-sizing: border-box;
`;

const DeleteAlertTitle = styled.p`
  color: ${({ theme: { color } }) => color.neutral.textStrong};
  font: ${({ theme: { font } }) => font.displayStrong16};
  height: 24px;
`;

const AlertButtonContainer = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: flex-end;
  gap: 32px;

  > button {
    font: ${({ theme: { font } }) => font.displayDefault16};
    > span {
      color: ${({ theme: { color } }) => color.system.warning};
    }
  }
`;
