import AppBar from "@components/AppBar";
import NavBar from "@components/NavBar/NavBar";
import ProductItem from "@components/Product/ProductItem";
import InfiniteScrollList from "@components/common/InfiniteScroll/InfiniteScrollList";
import { Tag } from "@components/common/Tag/Tag";
import { CategoryTag } from "@hooks/useRandomCategories";
import useWishlistItemsInfiniteQuery from "api/queries/useWishlistItemsInfiniteQuery";
import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";

export default function MyWishListPage() {
  const [selectedWishlistItemCategoryId, setSelectedWishlistItemCategoryId] =
    useState(1);

  const {
    data: wishlistItems,
    isFetching: isFetchingWishlistItems,
    isFetched: isFetchedWishlistItems,
    fetchNextPage: fetchMoreWishlistItems,
  } = useWishlistItemsInfiniteQuery({
    categoryId: selectedWishlistItemCategoryId,
  });
  const [wishlistItemCategoryTags, setWishlistItemCategoryTags] = useState<
    CategoryTag[]
  >([]);

  const onSelectWishlistItemCategory = (categoryId: number) => {
    setSelectedWishlistItemCategoryId(categoryId);
  };

  useEffect(() => {
    if (isFetchedWishlistItems && wishlistItems) {
      const categoryTags = wishlistItems.pages.reduce(
        (acc: CategoryTag[], group) => {
          const groupCategories = group.data.items.map((item) => item.category);
          return [...acc, ...groupCategories];
        },
        []
      );
      setWishlistItemCategoryTags([{ id: 1, title: "전체" }, ...categoryTags]);
    }
  }, [isFetchedWishlistItems, wishlistItems]);

  return (
    <StyledMyWishListPage>
      <AppBar>
        <PageTitle>관심 목록</PageTitle>
      </AppBar>

      <Wrapper>
        <TagArea>
          {wishlistItemCategoryTags.map((tag) => (
            <Tag
              key={tag.id}
              title={tag.title}
              isSelected={selectedWishlistItemCategoryId === tag.id}
              onClick={() => onSelectWishlistItemCategory(tag.id)}
            />
          ))}
        </TagArea>

        <InfiniteScrollList
          style={{ paddingBottom: "100px" }}
          onEndReached={() =>
            !isFetchingWishlistItems && fetchMoreWishlistItems()
          }>
          {wishlistItems &&
            wishlistItems.pages.map((group, idx) => (
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
