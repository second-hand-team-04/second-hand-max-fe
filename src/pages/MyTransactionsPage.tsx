import AppBar from "@components/AppBar";
import NavBar from "@components/NavBar/NavBar";
import ProductItem from "@components/Product/ProductItem";
import InfiniteScrollList from "@components/common/InfiniteScroll/InfiniteScrollList";
import { Tag } from "@components/common/Tag/Tag";
import useTransactionsInfiniteQuery from "api/queries/useTransactionsInfiniteQuery";
import { Fragment, useState } from "react";
import { styled } from "styled-components";

export default function MyTransactionsPage() {
  const [selectedTagId, setSelectedTagId] = useState<"0" | "1,3" | "2">("0");

  const onSelectTag = (tagNumber: "0" | "1,3" | "2") => {
    setSelectedTagId(tagNumber);
  };

  const tags: { id: "0" | "1,3" | "2"; title: string }[] = [
    { id: "0", title: "전체" },
    { id: "1,3", title: "판매 중" },
    { id: "2", title: "판매 완료" },
  ];

  const {
    data: transactionItems,
    isFetching: isFetchingTransactionItems,
    fetchNextPage: fetchMoreTransactionItems,
  } = useTransactionsInfiniteQuery({
    status: selectedTagId,
  });

  return (
    <StyledMyWishListPage>
      <AppBar>
        <PageTitle>판매 내역</PageTitle>
      </AppBar>

      <Wrapper>
        <TagArea>
          {tags.map((tag) => (
            <Tag
              key={tag.id}
              title={tag.title}
              isSelected={selectedTagId === tag.id}
              onClick={() => onSelectTag(tag.id)}
            />
          ))}
        </TagArea>

        <InfiniteScrollList
          style={{ paddingBottom: "100px" }}
          onEndReached={() =>
            !isFetchingTransactionItems && fetchMoreTransactionItems()
          }>
          {transactionItems &&
            transactionItems.pages.map((group, idx) => (
              <Fragment key={idx}>
                {group.data.items?.map((item) => (
                  <ProductItem key={item.id} item={item} />
                ))}
              </Fragment>
            ))}
        </InfiniteScrollList>
      </Wrapper>

      <NavBar />
    </StyledMyWishListPage>
  );
}

const StyledMyWishListPage = styled.div`
  width: inherit;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme: { color } }) => color.neutral.background};
  overflow: hidden;
`;

const PageTitle = styled.h2`
  width: 100%;
  font: ${({ theme: { font } }) => font.displayStrong16};
  color: ${({ theme: { color } }) => color.neutral.text};
  text-align: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 72px 16px 0 16px;
`;

const TagArea = styled.div`
  width: inherit;
  margin-bottom: 8px;
  display: flex;
  gap: 4px;
`;
