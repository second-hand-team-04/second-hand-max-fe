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
import { CategoryType } from "api/category/index";

type Props = {
  categoryList: CategoryType[];
  currentSelectedCategory: string;
  onCategoryModalClose: () => void;
  onCategoryItemSelect: (itemTitle: string) => void;
};

export default function CategoryModal({
  categoryList,
  currentSelectedCategory,
  onCategoryModalClose,
  onCategoryItemSelect,
}: Props) {
  const onCategoryItemClick = (itemTitle: string) => {
    onCategoryItemSelect(itemTitle);
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
          {categoryList.slice(1).map((item) => (
            <CategoryItem
              {...{
                key: item.id,
                item,
                onClick: onCategoryItemClick,
                isSelected: item.title === currentSelectedCategory,
              }}
            />
          ))}
        </ModalList>
      </ModalBody>
    </Modal>
  );
}
