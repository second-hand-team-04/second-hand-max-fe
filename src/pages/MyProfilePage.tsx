import cameraIcon from "@assets/icon/camera.svg";
import AppBar from "@components/AppBar";
import NavBar from "@components/NavBar/NavBar";
import Button from "@components/common/Button/Button";
import useImageInput from "@hooks/useImageInput";
import useText from "@hooks/useText";
import { validateNickname } from "@utils/textValidators";
import useSignOutMutation from "api/queries/useSignOutMutation";
import useUserInfoMutation from "api/queries/useUserInfoMutation";
import useUserInfoQuery from "api/queries/useUserInfoQuery";
import { HTTPSTATUS } from "api/types";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

export default function MyProfilePage() {
  const [isEditMode, setIsEditMode] = useState(false);

  const { data: userInfo } = useUserInfoQuery();
  const { mutate: signOutMutate } = useSignOutMutation();
  const { mutateAsync: userInfoMutateAsync } = useUserInfoMutation();

  const {
    value: nickname,
    error: nicknameError,
    onChange: onNicknameChange,
  } = useText({
    initialValue: userInfo?.nickname,
    validators: [validateNickname],
  });

  const {
    imageFile: profilePictureImage,
    error: imageFileError,
    onChange: onProfilePictureChange,
  } = useImageInput({ sizeLimit: 2000000 });

  const [profileImageObjectUrl, setProfileImageObjectUrl] = useState("");

  useEffect(() => {
    setProfileImageObjectUrl(
      profilePictureImage
        ? URL.createObjectURL(profilePictureImage)
        : userInfo?.imageUrl
        ? userInfo.imageUrl
        : ""
    );

    return () => {
      URL.revokeObjectURL(profileImageObjectUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilePictureImage, userInfo?.imageUrl]);

  const switchEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const onSignOutClick = () => {
    signOutMutate();
  };

  const completeEditProfile = async () => {
    const formData = new FormData();
    const isImageChanged = !!profilePictureImage;

    const requestData = {
      nickname: nickname,
      isImageChanged: isImageChanged,
    };
    formData.append(
      "request",
      new Blob([JSON.stringify(requestData)], { type: "application/json" })
    );
    if (profilePictureImage) {
      formData.append("image", profilePictureImage);
    }

    const res = await userInfoMutateAsync(formData);

    if (res.code === HTTPSTATUS.success) {
      switchEditMode();
    }
  };

  return (
    <StyledProfilePage>
      <AppBar>
        {isEditMode ? (
          <Button
            onClick={switchEditMode}
            style={{ width: "62px", position: "absolute", left: 0 }}
            variant="plain">
            <SideButtonText>뒤로</SideButtonText>
          </Button>
        ) : null}
        <AppBarTitle>내 계정</AppBarTitle>

        <Button
          onClick={isEditMode ? completeEditProfile : switchEditMode}
          style={{ width: "62px", position: "absolute", right: 0 }}
          variant="plain">
          <SideButtonText>{isEditMode ? "완료" : "수정"}</SideButtonText>
        </Button>
      </AppBar>
      <ImageInputError>{imageFileError}</ImageInputError>
      <ContentArea>
        <ProfilePictureLabel
          htmlFor="profilePictureInput"
          $isEditMode={isEditMode}
          $pictureURL={profileImageObjectUrl}>
          {isEditMode && (
            <>
              <ProfilePictureInput
                type="file"
                accept=".jpg, .jpeg, .png"
                name="profilePicture"
                id="profilePictureInput"
                onChange={onProfilePictureChange}
              />
              <CameraIcon src={cameraIcon} alt="사진 등록" />
            </>
          )}
        </ProfilePictureLabel>
        {isEditMode ? (
          <>
            <UserNameLabel>
              <UserNameEditInput
                type="text"
                value={nickname}
                onChange={(e) => onNicknameChange(e.target.value.trim())}
                required
              />
            </UserNameLabel>
            {<TextInputError>{nicknameError}</TextInputError>}
          </>
        ) : (
          <>
            <UserNameLabel>{userInfo?.nickname}</UserNameLabel>
            <Button
              onClick={onSignOutClick}
              style={{ marginTop: "40px", width: "329px" }}
              variant="contained">
              로그아웃
            </Button>
          </>
        )}
      </ContentArea>
      <NavBar />
    </StyledProfilePage>
  );
}

const SideButtonText = styled.span`
  font: ${({ theme: { font } }) => font.availableStrong16};
  color: ${({ theme: { color } }) => color.neutral.text};
`;

const UserNameLabel = styled.p`
  width: 120px;
  margin-top: 24px;
  font: ${({ theme: { font } }) => font.displayStrong16};
  font-size: 17px;
  color: ${({ theme: { color } }) => color.neutral.textStrong};
  text-align: center;
`;

const UserNameEditInput = styled.input`
  width: inherit;
  text-align: center;

  border-bottom: ${({ theme: { color } }) =>
    `1px solid ${color.neutral.borderStrong}`};
`;

const StyledProfilePage = styled.div`
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

const ProfilePictureLabel = styled.label<{
  $isEditMode: boolean;
  $pictureURL: string;
}>`
  width: 80px;
  height: 80px;
  position: relative;
  background: ${({ theme: { color }, $pictureURL }) =>
    $pictureURL ? `no-repeat url(${$pictureURL})` : color.neutral.overlay};
  background-size: cover;
  border-radius: 50%;
  border: ${({ theme: { color } }) => `1px solid ${color.neutral.border}`};
  overflow: hidden;
  cursor: ${({ $isEditMode }) => ($isEditMode ? "pointer" : "default")};
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
  position: absolute;
  top: 280px;
  height: 18px;
  margin-bottom: 2px;
  font: ${({ theme: { font } }) => font.availableDefault12};
  color: ${({ theme: { color } }) => color.system.warning};
`;

const ContentArea = styled.div`
  position: absolute;
  top: 194px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TextInputError = styled.p`
  position: absolute;
  top: 138px;
  height: 18px;
  padding-left: 12px;
  font: ${({ theme: { font } }) => font.availableDefault12};
  color: ${({ theme: { color } }) => color.system.warning};
`;
