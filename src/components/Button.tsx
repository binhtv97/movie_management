import React from "react";
import {
  Pressable,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  ActivityIndicator,
  StyleProp,
} from "react-native";
import { FontSize, Text, TextColor, FontWeight } from "./Text"; // Import FontWeight enum
import { COLOR } from "@/assets/common_css";

interface Props extends Omit<TouchableOpacityProps, "disabled"> {
  label?: string | null;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  textClassName?: string;
  iconLeft?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textColor?: TextColor;
  variantsText?: FontSize;
  fontWeight?: FontWeight; // Add fontWeight prop here
}

export const Button = React.forwardRef<View, Props>(
  (
    {
      loading,
      children,
      label,
      containerStyle,
      textColor,
      variantsText,
      fontWeight = FontWeight.LIGHT, // Default fontWeight to LIGHT (400)
      ...rest
    },
    ref
  ) => {
    return (
      <TouchableOpacity
        style={[styles.buttonContainer, containerStyle]}
        ref={ref}
        {...rest}
      >
        {children || (
          <>
            {loading ? (
              <ActivityIndicator color={"white"} size="small" />
            ) : (
              <View>
                <Text
                  color={textColor}
                  variants={variantsText}
                  fontWeight={fontWeight}
                >
                  {label}
                </Text>
              </View>
            )}
          </>
        )}
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 10,
    alignItems: "center",
    width: "auto",
    height: 50,
    justifyContent: "center",
    borderRadius: 40,
    backgroundColor: COLOR.button_disable,
  },
});
