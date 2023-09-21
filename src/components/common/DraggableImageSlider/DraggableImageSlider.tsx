import { PictureType } from "api/productItem";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
  imageList: PictureType[];
  description?: string;
};

export default function DraggableImageSlider({
  imageList,
  description,
}: Props) {
  return (
    <StyledDraggableImageSlider>
      <Swiper modules={[Pagination]} pagination={{ type: "fraction" }}>
        {imageList.map(({ id, imageUrl }) => (
          <SwiperSlide key={id}>
            <SlideImage src={imageUrl} alt={description} />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledDraggableImageSlider>
  );
}

const StyledDraggableImageSlider = styled.div`
  width: 100%;
  cursor: grab;

  .swiper {
    width: 100%;
    height: 100%;

    > .swiper-pagination-fraction {
      width: 59px;
      height: 32px;
      padding: 8px;
      position: absolute;
      bottom: 16px;
      left: 318px;
      font: ${({ theme: { font } }) => font.displayDefault12};
      color: ${({ theme: { color } }) => color.neutral.textWeak};
      border-radius: 16px;
      background: ${({ theme: { color } }) => color.neutral.backgroundBlur};
      backdrop-filter: ${({ theme: { backdropFilter } }) =>
        backdropFilter.blur};
    }
  }

  .swiper-slide {
    width: 100%;
    height: 100%;

    &::before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.24) 0%,
        rgba(0, 0, 0, 0.138832) 9.16%,
        rgba(0, 0, 0, 0) 26.27%
      );
    }
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
