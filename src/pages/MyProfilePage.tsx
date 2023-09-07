import AppBar from "@components/AppBar";
import NavBar from "@components/NavBar/NavBar";
import useUserInfoQuery from "api/queries/useUserInfoQuery";
import { styled } from "styled-components";
import cameraIcon from "@assets/icon/camera.svg";
import useImageInput from "@hooks/useImageInput";
import { useEffect, useState } from "react";
import Button from "@components/common/Button/Button";
import useSignOutMutation from "api/queries/useSignOutMutation";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "api/queries/queryKeys";

export default function MyProfilePage() {
  const queryClient = useQueryClient();

  const { data: userInfo } = useUserInfoQuery();
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");

  const { mutate: signOutMutate } = useSignOutMutation();

  const {
    imageFile: profilePictureImage,
    error: imageFileError,
    onChange: onProfilePictureChange,
  } = useImageInput({ sizeLimit: 2000000 });

  useEffect(() => {
    if (!profilePictureImage && userInfo) {
      setProfileImageUrl(userInfo.imageUrl);
    }
    if (profilePictureImage) {
      setProfileImageUrl(URL.createObjectURL(profilePictureImage));
    }
  }, [profilePictureImage, userInfo]);

  const onSignOutClick = () => {
    signOutMutate();
    console.log("queryKey:", queryKeys.user.info().queryKey);
    queryClient.setQueryData(queryKeys.user.info().queryKey, () => null);
  };

  return (
    <StyledProfilePage>
      <AppBar>
        <AppBarTitle>내 계정</AppBarTitle>
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
        <UserNameLabel>{userInfo?.nickname}</UserNameLabel>
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
