import { COLOR, FONT_SIZE } from "@/assets/common_css";
import React, { useMemo } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";

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

interface Props extends Omit<TextInputProps, "color"> {
  variants?: FontSize;
  color?: TextColor;
}

export const Input = ({ variants, color, style, ...rest }: Props) => {
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
  }, [variants]);
  return (
    <RNTextInput
      {...rest}
      style={StyleSheet.flatten([
        { fontSize: fontSize, color: textColor },
        styles.container,
        style,
      ])}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "auto",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR.dropdown_border,
    marginTop: 15,
    paddingHorizontal: 15,
  },
});
