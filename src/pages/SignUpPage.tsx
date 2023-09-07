import AppBar from "@components/AppBar";
import Button from "@components/common/Button/Button";
import cameraIcon from "@assets/icon/camera.svg";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import useText from "@hooks/useText";
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from "@utils/textValidators";
import { FormEvent } from "react";
import useImageInput from "@hooks/useImageInput";
import TextInput from "@components/common/TextInput/TextInput";
import useSignUpMutation from "api/queries/useSignUpMutation";

export default function SignUpPage() {
  const navigate = useNavigate();

  const { mutate: signUpMutate } = useSignUpMutation();

  const {
    imageFile: profileImage,
    error: imageFileError,
    onChange: onProfilePictureChange,
  } = useImageInput({ sizeLimit: 2000000 });

  const {
    value: nickname,
    error: nicknameError,
    isError: isNicknameError,
    onChange: onNicknameChange,
  } = useText({
    validators: [validateNickname],
  });

  const {
    value: email,
    error: emailError,
    isError: isEmailError,
    onChange: onEmailChange,
  } = useText({ validators: [validateEmail] });

  const {
    value: password,
    error: passwordError,
    isError: isPasswordError,
    onChange: onPasswordChange,
  } = useText({ validators: [validatePassword] });

  const { value: passwordConfirm, onChange: onPasswordConfirmChange } =
    useText();

  const onSignUp = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "request",
      new Blob([JSON.stringify({ email, password, nickname })], {
        type: "application/json",
      })
    );
    if (profileImage) {
      formData.append("image", profileImage);
    }

    signUpMutate(formData);
  };

  const isPasswordMatch = password === passwordConfirm;

  const isAllFieldsFilled =
    !!nickname &&
    !isNicknameError &&
    !!email &&
    !isEmailError &&
    !!password &&
    !isPasswordError &&
    !!passwordConfirm &&
    isPasswordMatch;

  return (
    <Form onSubmit={onSignUp}>
      <AppBar padding="8px">
        <Button
          type="button"
          variant="plain"
          size="L"
          onClick={() => navigate("/")}>
          닫기
        </Button>
        <AppBarTitle style={{ flexGrow: 1, textAlign: "center" }}>
          회원가입
        </AppBarTitle>
        <Button
          type="submit"
          variant="plain"
          size="L"
          disabled={!isAllFieldsFilled}>
          완료
        </Button>
      </AppBar>

      <FormInnerContainer>
        <ProfilePictureLabel
          htmlFor="profilePictureInput"
          $pictureURL={profileImage ? URL.createObjectURL(profileImage) : ""}>
          <ProfilePictureInput
            type="file"
            accept=".jpg, .jpeg, .png"
            name="profilePicture"
            id="profilePictureInput"
            onChange={onProfilePictureChange}
          />

          <CameraIcon src={cameraIcon} alt="사진 등록" />
        </ProfilePictureLabel>
        <ImageInputError>{imageFileError}</ImageInputError>

        <InputControl>
          <TextInputLabel htmlFor="nicknameInput">닉네임</TextInputLabel>
          <TextInput
            type="text"
            placeholder="닉네임"
            name="nickname"
            id="nicknameInput"
            value={nickname}
            onChange={onNicknameChange}
            required
          />
          {<TextInputError>{nicknameError}</TextInputError>}
        </InputControl>
        <InputControl>
          <TextInputLabel htmlFor="emailInput">이메일</TextInputLabel>
          <TextInput
            type="text"
            placeholder="이메일"
            name="email"
            id="emailInput"
            value={email}
            onChange={onEmailChange}
            required
          />
          {<TextInputError>{emailError}</TextInputError>}
        </InputControl>
        <InputControl>
          <TextInputLabel htmlFor="passwordInput">비밀번호</TextInputLabel>
          <TextInput
            type="password"
            placeholder="비밀번호"
            name="password"
            id="passwordInput"
            value={password}
            onChange={onPasswordChange}
            required
          />
          {<TextInputError>{passwordError}</TextInputError>}
        </InputControl>
        <InputControl>
          <TextInputLabel htmlFor="passwordCheckInput">
            비밀번호 확인
          </TextInputLabel>
          <TextInput
            type="password"
            placeholder="비밀번호 확인"
            id="passwordCheckInput"
            value={passwordConfirm}
            onChange={onPasswordConfirmChange}
            required
          />
          <TextInputError>
            {(!isPasswordMatch || (password && passwordConfirm === "")) &&
              "비밀번호가 일치하지 않습니다"}
          </TextInputError>
        </InputControl>
      </FormInnerContainer>
    </Form>
  );
}

const Form = styled.form`
  width: inherit;
  height: 100%;
  position: relative;
  background-color: ${({ theme: { color } }) => color.neutral.background};
`;

const AppBarTitle = styled.p`
  font: ${({ theme: { font } }) => font.displayStrong16};
  color: ${({ theme: { color } }) => color.neutral.textStrong};
`;

const FormInnerContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 194px;
  padding-inline: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const ProfilePictureLabel = styled.label<{ $pictureURL: string }>`
  width: 80px;
  height: 80px;
  position: relative;
  background: ${({ theme: { color }, $pictureURL }) =>
    $pictureURL ? `no-repeat url(${$pictureURL})` : color.neutral.overlay};
  background-size: cover;
  border-radius: 50%;
  border: ${({ theme: { color } }) => `1px solid ${color.neutral.border}`};
  overflow: hidden;
  cursor: pointer;
`;

const ProfilePictureInput = styled.input`
  width: inherit;
  height: inherit;
  visibility: hidden;
`;

const CameraIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  filter: ${({ theme: { filter } }) => filter.accentText};
  z-index: 1;
`;

const ImageInputError = styled.p`
  height: 18px;
  margin-bottom: 2px;
  font: ${({ theme: { font } }) => font.availableDefault12};
  color: ${({ theme: { color } }) => color.system.warning};
`;

const InputControl = styled.div`
  width: 100%;
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
