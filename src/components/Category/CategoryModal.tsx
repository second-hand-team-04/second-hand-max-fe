import xIcon from "@assets/icon/x.svg";
import {
  IconWrapper,
  ModalBody,
  ModalHeader,
  ModalList,
  ModalTitle,
} from "@components/common/Modal/ModalStyles";
import CategoryItem from "./CategoryItem";

import Modal from "@components/common/Modal/Modal";
import { CategoryTag } from "@hooks/useRandomCategories";
import { CategoryType } from "api/category";

type Props = {
  categoryList: CategoryType[];
  currentSelectedCategory: CategoryTag;
  onCategoryModalClose: () => void;
  onCategoryItemSelect: (category: CategoryTag) => void;
};

export default function CategoryModal({
  categoryList,
  currentSelectedCategory,
  onCategoryModalClose,
  onCategoryItemSelect,
}: Props) {
  const onCategoryItemClick = (category: CategoryTag) => {
    onCategoryItemSelect(category);
    onCategoryModalClose();
  };

  return (
    <Modal onClose={onCategoryModalClose}>
      <ModalHeader>
        <ModalTitle>카테고리</ModalTitle>
        <IconWrapper onClick={onCategoryModalClose}>
          <img src={xIcon} alt="close" />
        </IconWrapper>
      </ModalHeader>
      <ModalBody>
        <ModalList>
          {categoryList.slice(1).map(({ id, title }) => (
            <CategoryItem
              {...{
                key: id,
                item: { id, title },
                onClick: onCategoryItemClick,
                isSelected: id === currentSelectedCategory.id,
              }}
            />
          ))}
        </ModalList>
      </ModalBody>
    </Modal>
  );
}
