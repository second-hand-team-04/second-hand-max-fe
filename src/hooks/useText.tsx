import { ChangeEvent, useState } from "react";

type Props = {
  initialValue?: string;
  validators?: Array<(value: string) => void>;
};

export default function useText(options?: Props) {
  const { initialValue = "", validators } = options || {};

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newVal = e.target.value.trim();

    if (!validators) {
      setValue(newVal);
      return;
    }

    validators.forEach((validator) => {
      try {
        validator(newVal);
        setError("");
      } catch (error) {
        setError((error as Error).message);
        return;
      }
    });

    setValue(newVal);
  };

  return {
    value,
    error,
    isError: error !== "",
    onChange,
  };
}
