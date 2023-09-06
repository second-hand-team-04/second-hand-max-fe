import { styled } from "styled-components";
import Button from "./common/Button/Button";
import kakaoBubbleIcon from "@assets/images/kakao_bubble_icon.png";
import openPopUpWindow from "@utils/openPopUpWindow";
import { useContext } from "react";
import { WindowContext } from "@context/WindowContext";

const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_CLIENT_URL_PROD
    : import.meta.env.VITE_CLIENT_URL_DEV;

export default function KakaoSignInButton() {
  const { onOpenPopUpWindow } = useContext(WindowContext);

  const onClick = () => {
    const oAuthPopUpWindow = openPopUpWindow(
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
        import.meta.env.VITE_AUTH_KAKAO_CLIENT_ID
      }&redirect_uri=${CLIENT_URL}/signin`,
      "kakaoOAuth",
      500,
      600
    )!; // TODO: handle case where popup doesn't show (Ex: user blocked pop ups)

    onOpenPopUpWindow(oAuthPopUpWindow);
  };

  return (
    <StyledKakaoSignInButton variant="contained" size="M" onClick={onClick}>
      <KakaoBubbleIcon src={kakaoBubbleIcon} alt="카카오 로그인" />
      <span>카카오 로그인</span>
    </StyledKakaoSignInButton>
  );
}

const StyledKakaoSignInButton = styled(Button)`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background-color: ${({ theme: { color } }) => color.kakao.primary};
  color: ${({ theme: { color } }) => color.kakao.label};
  font: ${({ theme: { font } }) => font.displayDefault16};
`;

const KakaoBubbleIcon = styled.img`
  width: 20px;
`;
