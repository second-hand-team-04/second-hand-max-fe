import { HTMLAttributes, ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";

type Props = {
  onEndReached: () => void;
  children: ReactNode;
} & HTMLAttributes<HTMLUListElement>;

export default function InfiniteScrollList({
  onEndReached,
  children,
  ...props
}: Props) {
  const scrollListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const scrollListNode = scrollListRef.current;

    if (!scrollListNode) return;

    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = scrollListNode;

      const isBottom = Math.floor(scrollHeight - scrollTop) <= clientHeight;

      if (isBottom) {
        onEndReached();
      }
    };

    scrollListNode.addEventListener("scroll", handleScroll);

    return () => scrollListNode.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollListRef.current, onEndReached]);

  return (
    <StyledInfiniteScrollList ref={scrollListRef} {...props}>
      {children}
    </StyledInfiniteScrollList>
  );
}

const StyledInfiniteScrollList = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
