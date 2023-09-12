import { styled } from "styled-components";

export default function ProductImage({
  imageUrl,
  alt,
}: {
  imageUrl: string;
  alt: string;
}) {
  return <StyledProductImage src={imageUrl} alt={alt} />;
}

const StyledProductImage = styled.img`
  width: 393px;
  height: 491px;
  object-fit: cover;
`;
