import { useEffect, useRef } from "react";

export default function useOutsideClick<T extends HTMLElement = HTMLDivElement>(
  callbackFn: () => void
) {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        callbackFn();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [callbackFn]);

  return containerRef;
}
