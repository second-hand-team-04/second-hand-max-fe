import { RefObject, useEffect, useRef } from "react";

export default function useIntersection(
  elementRef: RefObject<Element>,
  boundaryElement?: RefObject<Element>
) {
  const intersectingSideRef = useRef<"left" | "right">("left");

  const updateEntry = ([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      const { left, right } = entry.boundingClientRect;
      if (left <= 0) {
        intersectingSideRef.current = "left";
      } else if (
        right >=
        (boundaryElement?.current?.getBoundingClientRect().right ??
          window.innerWidth)
      ) {
        intersectingSideRef.current = "right";
      }
      return;
    }
  };

  useEffect(() => {
    const elementNode = elementRef?.current;

    if (!elementNode) return;

    const observerOptions = {
      root: boundaryElement?.current ?? null,
    };
    const observer = new IntersectionObserver(updateEntry, observerOptions);
    observer.observe(elementNode);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef?.current]);

  return intersectingSideRef.current;
}
