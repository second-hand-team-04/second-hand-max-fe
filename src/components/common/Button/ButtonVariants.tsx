import { styled } from "styled-components";
import { Size } from "./types";
import { BackgroundColor, BorderColor, BorderRadius, Color } from "../types";

interface ButtonTransientProps {
  $size: Size;
  $backgroundColor: BackgroundColor | "";
  $borderColor: BorderColor | "";
  $borderRadius: BorderRadius;
  $color: Color | "";
}

type ButtonBaseProps = Pick<ButtonTransientProps, "$size">;
type PlainButtonProps = Pick<
  ButtonTransientProps,
  "$size" | "$backgroundColor" | "$color"
>;
type ContainedButtonProps = Pick<
  ButtonTransientProps,
  "$size" | "$backgroundColor" | "$borderRadius" | "$color"
>;
type OutlinedButtonProps = Pick<
  ButtonTransientProps,
  "$size" | "$backgroundColor" | "$borderColor" | "$borderRadius" | "$color"
>;

const ButtonBase = styled.button<ButtonBaseProps>`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font: ${({ theme: { font }, $size }) => {
    switch ($size) {
      case "S":
        return font.availableStrong10;
      case "M":
        return font.availableStrong12;
      case "L":
        return font.availableStrong16;
      case "XL":
        return font.availableStrong16;
    }
  }};
  cursor: pointer;
`;

export const PlainButton = styled(ButtonBase)<PlainButtonProps>`
  padding: ${({ $size }) => {
    switch ($size) {
      case "S":
        return "4px 10px";
      case "M":
        return "8px";
      case "L":
        return "8px";
      case "XL":
        return "12px";
    }
  }};
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor ? $backgroundColor : "transparent"};
  border: none;
  color: ${({ theme: { color }, $color }) =>
    $color ? $color : color.neutral.text};
`;

export const ContainedButton = styled(ButtonBase)<ContainedButtonProps>`
  padding: ${({ $size }) => {
    switch ($size) {
      case "S":
        return "8px 16px";
      case "M":
        return "16px";
      case "L":
        return "20px";
      case "XL":
        return "20px";
    }
  }};
  background-color: ${({ theme: { color }, $backgroundColor }) =>
    $backgroundColor ? $backgroundColor : color.accent.backgroundPrimary};
  border: none;
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? $borderRadius : "8px"};
  color: ${({ theme: { color }, $color }) =>
    $color ? $color : color.accent.text};
`;

export const OutlinedButton = styled(ButtonBase)<OutlinedButtonProps>`
  padding: ${({ $size }) => {
    switch ($size) {
      case "S":
        return "8px 16px";
      case "M":
        return "16px";
      case "L":
        return "20px";
      case "XL":
        return "20px";
    }
  }};
  background-color: ${({ theme: { color } }) => color.accent.text};
  border: ${({ theme: { color }, $borderColor }) =>
    `0.8px solid ${$borderColor ? $borderColor : color.neutral.border}`};
  border-radius: ${({ $borderRadius }) =>
    $borderRadius ? $borderRadius : "8px"};
  color: ${({ theme: { color }, $color }) =>
    $color ? $color : color.neutral.text};
`;
