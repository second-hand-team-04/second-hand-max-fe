import AppBar from "@components/AppBar";
import NavBar from "@components/NavBar/NavBar";
import useUserInfoQuery from "api/queries/useUserInfoQuery";
import { styled } from "styled-components";
import cameraIcon from "@assets/icon/camera.svg";
import useImageInput from "@hooks/useImageInput";
import Button from "@components/common/Button/Button";
import useSignOutMutation from "api/queries/useSignOutMutation";
import { useState } from "react";
import useText from "@hooks/useText";
import { validateNickname } from "@utils/textValidators";
import useUserInfoMutation from "api/queries/useProfileMutation";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "api/queries/queryKeys";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export default function MyProfilePage() {
  const queryClient = useQueryClient();

  const [isEditMode, setIsEditMode] = useState(false);

  const { data: userInfo } = useUserInfoQuery();
  const { mutate: signOutMutate } = useSignOutMutation();
  const { mutateAsync } = useUserInfoMutation();

  const {
    value: nickname,
    error: nicknameError,
    onChange: onNicknameChange,
  } = useText({
    validators: [validateNickname],
  });

  const {
    imageFile: profilePictureImage,
    error: imageFileError,
    onChange: onProfilePictureChange,
  } = useImageInput({ sizeLimit: 2000000 });

  const profileImageUrl = profilePictureImage
    ? URL.createObjectURL(profilePictureImage)
    : userInfo?.imageUrl
    ? userInfo.imageUrl
    : "";

  const switchEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const onSignOutClick = () => {
    signOutMutate();
  };

  const completeEditProfile = async () => {
    try {
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

      const res = await mutateAsync(formData);
      console.log(res);

      if (res.status === 200) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.user.info().queryKey,
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error(String(error));
    }
    switchEditMode();
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
          $pictureURL={profileImageUrl}>
          <ProfilePictureInput
            type="file"
            accept=".jpg, .jpeg, .png"
            name="profilePicture"
            id="profilePictureInput"
            onChange={onProfilePictureChange}
          />
          <CameraIcon src={cameraIcon} alt="사진 등록" />
        </ProfilePictureLabel>
        {isEditMode ? (
          <>
            <UserNameLabel>
              <input
                style={{
                  textAlign: "center",
                }}
                type="text"
                placeholder={userInfo?.nickname}
                value={nickname ? nickname : userInfo?.nickname}
                onChange={onNicknameChange}
                required
              />
            </UserNameLabel>
            {<TextInputError>{nicknameError}</TextInputError>}
          </>
        ) : (
          <UserNameLabel>{userInfo?.nickname}</UserNameLabel>
        )}
        <Button
          onClick={onSignOutClick}
          style={{ marginTop: "40px", width: "329px" }}
          variant="contained">
          로그아웃
        </Button>
      </ContentArea>
      <NavBar />
    </StyledProfilePage>
  );
}

const SideButtonText = styled.button`
  font: ${({ theme: { font } }) => font.availableStrong16};
  color: ${({ theme: { color } }) => color.neutral.text};
`;

const UserNameLabel = styled.p`
  margin-top: 24px;
  font: ${({ theme: { font } }) => font.displayStrong16};
  font-size: 17px;
  color: ${({ theme: { color } }) => color.neutral.textStrong};
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
