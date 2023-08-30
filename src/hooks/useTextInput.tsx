import { ChangeEvent, useState } from "react";

type Props = {
  initialValue?: string;
  validators?: Array<(value: string) => void>;
};

export default function useTextInput({ initialValue = "", validators }: Props) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    onChange,
  };
}
