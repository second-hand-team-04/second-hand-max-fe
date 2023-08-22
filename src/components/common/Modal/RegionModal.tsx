import { styled } from "styled-components";

export function RegionModal() {
  const onRegionDeleteButtonClick = () => {
    console.log("삭제 버튼 클릭");
  };

  const onAddButtonClick = () => {
    console.log("추가 버튼 클릭");
  };

  return (
    <ModalContainer>
      <ModalHeader>
        <ModalTitle>동네 설정</ModalTitle>
        <IconWrapper>
          {/* // TODO: 버튼 아이콘으로 리팩토링 필요 */}
          <img src="src/assets/icon/x.svg" alt="close" />
        </IconWrapper>
      </ModalHeader>
      <RegionModalContent>
        <ContentNotice>
          {"지역은 최소1개,"}
          <br />
          {"최대 2개까지 설정 가능해요."}
        </ContentNotice>
        <ButtonsContainer>
          {list.map((item, index) => (
            <ContentRegionButton key={index}>
              <RegionButtonText>{item}</RegionButtonText>
              {/* // TODO: 버튼 아이콘으로 리팩토링 및 필터 색깔 변경 필요*/}
              <img
                onClick={onRegionDeleteButtonClick}
                src="src/assets/icon/circle-x-filled.svg"
                alt="close"
              />
            </ContentRegionButton>
          ))}
          <ContentAddButton onClick={onAddButtonClick}>
            {/* // TODO: 버튼 아이콘으로 리팩토링 필요*/}
            <img
              onClick={onRegionDeleteButtonClick}
              src="src/assets/icon/plus.svg"
              alt="plus"
            />
            <div>추가</div>
          </ContentAddButton>
        </ButtonsContainer>
      </RegionModalContent>
    </ModalContainer>
  );
}

// TODO: 버튼에 사용되는 공통된 속성
const commonButtonStyles = `
  display: flex;
  width: 100%;
  height: 56px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

// TODO: export 해놓은 스타일 컴포넌트들 공통 모달 스타일로 묶어줘야함
export const ModalContainer = styled.div`
  width: 320px;
  height: 700px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme: { color } }) => color.neutral.background};
  border-radius: 16px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const ModalHeader = styled.div`
  width: 100%;
  height: 72px;
  padding: 8px 8px 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.div`
  display: flex;
  font: ${({ theme: { font } }) => font.displayStrong20};
  width: 100%;
  height: 32px;
`;

export const IconWrapper = styled.button`
  display: flex;
  width: 48px;
  height: 48px;
  padding: 12px;
  justify-content: center;
  align-items: center;
`;
// TODO ------------------------------

const RegionModalContent = styled.div`
  display: flex;
  width: 100%;
  padding: 40px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
`;

const ContentNotice = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 32px;
  text-align: center;
  font: ${({ theme: { font } }) => font.displayDefault12};
  color: ${({ theme: { color } }) => color.neutral.text};
`;

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
`;

const ContentRegionButton = styled.button`
  ${commonButtonStyles}
  padding: 16px;
  background-color: ${({ theme: { color } }) => color.accent.backgroundPrimary};
`;

const RegionButtonText = styled.div`
  display: flex;
  width: 100%;
  height: 24px;
  font: ${({ theme: { font } }) => font.availableStrong16};
  color: ${({ theme: { color } }) => color.accent.text};
`;

const ContentAddButton = styled.button`
  ${commonButtonStyles}
  background-color: ${({ theme: { color } }) => color.accent.text};
  color: ${({ theme: { color } }) => color.accent.textWeak};
  font: ${({ theme: { font } }) => font.availableStrong16};
  border: 0.8px solid ${({ theme: { color } }) => color.neutral.border};
`;

const list = ["역삼1동", "역삼2동"];
