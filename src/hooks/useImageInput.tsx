import { ChangeEvent, useState } from "react";

type Props = {
  sizeLimit: number; // bytes
};

export default function useImageInput({ sizeLimit }: Props) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const newImageFile = files[0];

    if (newImageFile.size > sizeLimit) {
      setError(`이미지 사이즈 ${Math.floor(sizeLimit / 1000000)}MB 이하`);
      setImageFile(null);
      return;
    }

    setImageFile(newImageFile);
    setError("");
  };

  return { imageFile, error, onChange };
}
