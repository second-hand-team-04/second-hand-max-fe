import { useState } from "react";
import { Item } from "./selectInputProps";

export default function useSelectInput<T = Item>(
  initialVal: T
): [T, (newItem: T) => void] {
  const [selectedItem, setSelectedItem] = useState(initialVal);

  const onItemChange = (newItem: T) => {
    setSelectedItem(newItem);
  };

  return [selectedItem, onItemChange];
}
