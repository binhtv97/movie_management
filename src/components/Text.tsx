import { COLOR, FONT_SIZE } from "@/assets/common_css";
import React, { useMemo } from "react";
import { Text as RNText, TextProps } from "react-native";

export enum FontSize {
  NORMAL = 16,
  UPPER_CASE = 20,
  SMALL = 14,
}

export enum TextColor {
  HEADER = "HEADER",
  DESCRIPTION = "DESCRIPTION",
  DISABLE = "DISABLE",
  WHITE = "WHITE",
}

export enum FontWeight {
  LIGHT = 400,
  MEDIUM = 600,
  BOLD = 700,
}

interface Props extends Omit<TextProps, "color" | "fontWeight"> {
  variants?: FontSize;
  color?: TextColor;
  fontWeight?: FontWeight; // Added fontWeight prop
}

export const Text = ({
  variants,
  color,
  fontWeight = FontWeight.LIGHT,
  style,
  ...rest
}: Props) => {
  const fontSize = useMemo(() => {
    switch (variants) {
      case FontSize.NORMAL:
        return FONT_SIZE.basic;
      case FontSize.SMALL:
        return FONT_SIZE.description;
      case FontSize.UPPER_CASE:
        return FontSize.UPPER_CASE;
      default:
        return FONT_SIZE.basic;
    }
  }, [variants]);

  const textColor = useMemo(() => {
    switch (color) {
      case TextColor.HEADER:
        return COLOR.header;
      case TextColor.DESCRIPTION:
        return COLOR.description;
      case TextColor.DISABLE:
        return COLOR.disable_text;
      case TextColor.WHITE:
        return COLOR.item_text;
      default:
        return COLOR.header;
    }
  }, [color]);

  return (
    <RNText
      {...rest}
      style={[{ fontSize, color: textColor, fontWeight }, style]}
    />
  );
};
