import { PictureType } from "api/productItem";
import useProductImageUploadMutation from "api/productItem/queries/useProductImageUploadMutation";
import { HTTPSTATUS } from "api/types";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

export default function useUploadedImagesList() {
  const { mutateAsync: imageUploadMutateAsync } =
    useProductImageUploadMutation();

  const [uploadedImagesList, setUploadedImagesList] = useState<PictureType[]>(
    []
  );

  const initializeUploadedImagesList = (existingImages: PictureType[]) => {
    setUploadedImagesList(existingImages);
  };

  const onImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const newImageFile = files[0];

    if (newImageFile.size > 500000) {
      toast.error("이미지는 5MB 이하이여야 합니다");
      return;
    }

    const formData = new FormData();
    formData.append(
      "request",
      new Blob([JSON.stringify({ type: "item" })], {
        type: "application/json",
      })
    );

    formData.append("image", newImageFile);

    const res = await imageUploadMutateAsync(formData);

    if (res.code === HTTPSTATUS.success) {
      const imageObj = res.data;
      setUploadedImagesList((prevList) => [...prevList, imageObj]);
    }
  };

  const onImageDelete = (pictureId: number) => {
    setUploadedImagesList((prevList) =>
      prevList.filter((picture) => picture.id !== pictureId)
    );
  };

  return {
    uploadedImagesList,
    initializeUploadedImagesList,
    onImageUpload,
    onImageDelete,
  };
}
