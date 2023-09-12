import { ButtonHTMLAttributes, ReactNode } from "react";
import { BackgroundColor, BorderColor, BorderRadius, Color } from "../types";
import { ContainedButton, OutlinedButton, PlainButton } from "./ButtonVariants";
import { Size, Variant } from "./types";

type Props = {
  variant?: Variant;
  size?: Size;
  backgroundColor?: BackgroundColor | "";
  borderColor?: BorderColor | "";
  borderRadius?: BorderRadius;
  color?: Color | "";
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant = "contained",
  size = "M",
  backgroundColor = "",
  borderColor = "",
  borderRadius = "",
  color = "",
  children,
  ...props
}: Props) {
  if (variant === "plain") {
    return (
      <PlainButton
        $size={size}
        $backgroundColor={backgroundColor}
        $color={color}
        {...props}>
        {children}
      </PlainButton>
    );
  }

  if (variant === "contained") {
    return (
      <ContainedButton
        $size={size}
        $backgroundColor={backgroundColor}
        $borderRadius={borderRadius}
        $color={color}
        {...props}>
        {children}
      </ContainedButton>
    );
  }

  if (variant === "outlined") {
    return (
      <OutlinedButton
        $size={size}
        $backgroundColor={backgroundColor}
        $borderColor={borderColor}
        $borderRadius={borderRadius}
        $color={color}
        {...props}>
        {children}
      </OutlinedButton>
    );
  }
}
