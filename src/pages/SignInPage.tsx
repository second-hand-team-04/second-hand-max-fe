import AppBar from "@components/AppBar";
import KakaoSignInButton from "@components/KakaoSignInButton";
import NavBar from "@components/NavBar/NavBar";
import Button from "@components/common/Button/Button";
import TextInput from "@components/common/TextInput/TextInput";
import useText from "@hooks/useText";
import { validateEmail } from "@utils/textValidators";
import useOAuthSignInMutation from "api/user/queries/useOAuthSignInMutation";
import useSignInMutation from "api/user/queries/useSignInMutation";
import { CLIENT_URL } from "config";
import { WindowContext } from "context/WindowContext";
import { FormEvent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Routes from "router/Routes";
import { styled } from "styled-components";

export default function SignInPage() {
  const navigate = useNavigate();
  const { popUpWindow, closePopUpWindow } = useContext(WindowContext);

  const { mutate: signInMutate } = useSignInMutation();
  const { mutate: oAuthSignInMutate } = useOAuthSignInMutation();

  const {
    value: email,
    error: emailError,
    onChange: onEmailChange,
  } = useText({ validators: [validateEmail] });
  const { value: password, onChange: onPasswordChange } = useText();

  const onSignIn = async (e: FormEvent) => {
    e.preventDefault();
    signInMutate({ email, password });
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
        }
        closePopUpWindow();
      }
    };

    window.addEventListener("message", closeWindowMessageHandler);

    return () => {
      window.removeEventListener("message", closeWindowMessageHandler);
    };
  }, [closePopUpWindow, oAuthSignInMutate, popUpWindow]);

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
                onChange: (e) => onEmailChange(e.target.value.trim()),
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
                onChange: (e) => onPasswordChange(e.target.value.trim()),
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

        <Button
          variant="plain"
          size="M"
          onClick={() => navigate(Routes.SIGNUP)}>
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
