import { PictureType } from "api/productItem";
import useImageUploadMutation from "api/queries/useImageUploadMutation";
import { HTTPSTATUS } from "api/types";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  existingImages?: PictureType[];
};

export default function useUploadedImagesList({ existingImages }: Props) {
  const { mutateAsync: imageUploadMutateAsync } = useImageUploadMutation();

  const [uploadedImagesList, setUploadedImagesList] = useState<PictureType[]>(
    existingImages ?? []
  );

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

  return { uploadedImagesList, onImageUpload, onImageDelete };
}
