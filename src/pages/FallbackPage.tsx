import { styled } from "styled-components";
import logo from "@assets/images/logo.jpeg";
import { useNavigate } from "react-router-dom";
import Button from "@components/common/Button/Button";
import Routes from "router/Routes";

export default function FallbackPage() {
  const navigate = useNavigate();

  return (
    <StyledFallbackPage>
      <Description>잘못된 접근입니다</Description>
      <img src={logo} alt="로고" />

      <ButtonsContainer>
        <GoBackButton variant="contained" onClick={() => window.history.go(-1)}>
          이전 화면으로 가기
        </GoBackButton>
        <Button variant="contained" onClick={() => navigate(Routes.HOME)}>
          홈으로 가기
        </Button>
      </ButtonsContainer>
    </StyledFallbackPage>
  );
}

const StyledFallbackPage = styled.div`
  width: inherit;
  height: 100%;
  background-color: ${({ theme: { color } }) => color.neutral.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Description = styled.h2`
  margin-bottom: 30px;
  font: ${({ theme: { font } }) => font.displayDefault26};
  color: ${({ theme: { color } }) => color.neutral.text};
`;

const ButtonsContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  > button {
    width: 35%;
  }
`;

const GoBackButton = styled(Button)`
  background-color: ${({ theme: { color } }) => color.neutral.backgroundBold};
  color: ${({ theme: { color } }) => color.neutral.text};
`;
