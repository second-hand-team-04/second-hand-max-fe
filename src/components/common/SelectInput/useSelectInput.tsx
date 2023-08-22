import { useState } from "react";
import { Item } from "./selectInputProps";

export default function useSelectInput(
  initialVal: Item
): [Item, (newItem: Item) => void] {
  const [selectedItem, setSelectedItem] = useState(initialVal);

  const onItemChange = (newItem: Item) => {
    setSelectedItem(newItem);
  };

  return [selectedItem, onItemChange];
}
