type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;
export type BackgroundColor = Color;
export type BorderColor = Color;
export type BorderRadius = `${number}${"px" | "%"}` | "";
