import AppBar from "@components/AppBar";
import TextInput from "@components/common/TextInput/TextInput";
import { styled } from "styled-components";
import useText from "@hooks/useText";
import NavBar from "@components/NavBar/NavBar";
import { validateEmail } from "@utils/textValidators";
import Button from "@components/common/Button/Button";
import { useNavigate } from "react-router-dom";
import { FormEvent, useContext, useEffect } from "react";
import useSignInMutation from "api/queries/useSignInMutation";
import useUserInfoQuery from "api/queries/useUserInfoQuery";
import KakaoSignInButton from "@components/KakaoSignInButton";
import useOAuthSignInMutation from "api/queries/useOAuthSignInMutation";
import { WindowContext } from "context/WindowContext";

const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_CLIENT_URL_PROD
    : import.meta.env.VITE_CLIENT_URL_DEV;

export default function SignInPage() {
  const navigate = useNavigate();
  const { popUpWindow, closePopUpWindow } = useContext(WindowContext);

  const { mutate: signInMutate } = useSignInMutation();
  const { mutate: oAuthSignInMutate } = useOAuthSignInMutation();
  const { refetch: fetchUserInfo } = useUserInfoQuery();

  const {
    value: email,
    error: emailError,
    onChange: onEmailChange,
  } = useText({ validators: [validateEmail] });
  const { value: password, onChange: onPasswordChange } = useText();

  const onSignIn = async (e: FormEvent) => {
    e.preventDefault();
    signInMutate({ email, password });
    fetchUserInfo();
  };

  // Receive auth code in the popup window from the OAuth provider and send it to the original window.
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");
    if (authCode) {
      // Send auth code to original window.
      window.opener.postMessage({ authCode }, CLIENT_URL);
    }
  }, []);

  // Receive auth code in original window from popup window.
  useEffect(() => {
    if (!popUpWindow) return;

    const closeWindowMessageHandler = (e: MessageEvent) => {
      if (e.origin === CLIENT_URL) {
        const { authCode } = e.data;
        if (authCode) {
          // TODO: determine provider dynamically.
          oAuthSignInMutate({ provider: "kakao", authCode });
          fetchUserInfo();
        }
        closePopUpWindow();
      }
    };

    window.addEventListener("message", closeWindowMessageHandler);

    return () => {
      window.removeEventListener("message", closeWindowMessageHandler);
    };
  }, [closePopUpWindow, fetchUserInfo, oAuthSignInMutate, popUpWindow]);

  const isAllFieldsFilled = !!email && !emailError && !!password;

  return (
    <StyledSignInPage>
      <AppBar>
        <AppBarTitle>내 계정</AppBarTitle>
      </AppBar>

      <Wrapper>
        <Form onSubmit={onSignIn}>
          <InputControl>
            <TextInputLabel>이메일</TextInputLabel>
            <TextInput
              {...{
                placeholder: "이메일",
                value: email,
                onChange: onEmailChange,
              }}
            />
            {<TextInputError>{emailError}</TextInputError>}
          </InputControl>
          <InputControl>
            <TextInputLabel>비밀번호</TextInputLabel>
            <TextInput
              {...{
                type: "password",
                placeholder: "비밀번호",
                value: password,
                onChange: onPasswordChange,
              }}
            />
          </InputControl>

          <Button
            type="submit"
            variant="contained"
            size="M"
            style={{ width: "100%" }}
            disabled={!isAllFieldsFilled}>
            <ButtonText>로그인</ButtonText>
          </Button>
        </Form>

        <KakaoSignInButton />

        <Button variant="plain" size="M" onClick={() => navigate("/signup")}>
          회원가입
        </Button>
      </Wrapper>

      <NavBar />
    </StyledSignInPage>
  );
}

const StyledSignInPage = styled.div`
  width: inherit;
  height: 100%;
  position: relative;
  background-color: ${({ theme: { color } }) => color.neutral.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AppBarTitle = styled.p`
  font: ${({ theme: { font } }) => font.displayStrong16};
  color: ${({ theme: { color } }) => color.neutral.textStrong};
  flex-grow: 1;
  text-align: center;
`;

const Wrapper = styled.div`
  width: 100%;
  padding-inline: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputControl = styled.div`
  width: 100%;
  margin-bottom: 8px;

  &:last-of-type {
    margin-bottom: 40px;
  }
`;

const TextInputLabel = styled.label`
  width: 100%;
  margin-bottom: 8px;
  display: block;
  font: ${({ theme: { font } }) => font.displayStrong16};
  color: ${({ theme: { color } }) => color.neutral.textStrong};
`;

const TextInputError = styled.p`
  height: 18px;
  padding-left: 12px;
  font: ${({ theme: { font } }) => font.availableDefault12};
  color: ${({ theme: { color } }) => color.system.warning};
`;

const ButtonText = styled.span`
  font: ${({ theme: { font } }) => font.availableStrong16};
`;
