import { COLOR } from "@/assets/common_css";
import type { PropsWithChildren } from "react";
import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenContainerProps = PropsWithChildren & {
  style?: StyleProp<ViewStyle>;
};

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  style,
  children,
}) => {
  return (
    <SafeAreaView
      style={StyleSheet.flatten([
        { flex: 1, backgroundColor: COLOR.background },
        style,
      ])}
    >
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
