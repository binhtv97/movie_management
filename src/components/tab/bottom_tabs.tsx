import { ROUTE_KEY } from "@/navigation/route_key";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "../Text";

export interface Props extends BottomTabBarProps {
  bottom: number;
}

const BottomTabs = ({ state, descriptors, navigation, bottom }: Props) => {
  return (
    <View style={[{ paddingBottom: bottom + 4 }, styles.container]}>
      <View>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = (
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name
          ) as string;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const getIcon = () => {
            const color = "#FFFFFF";
            switch (route.name) {
              case ROUTE_KEY.Home:
                return <></>;
              case ROUTE_KEY.WatchList:
                return <></>;
              default:
                break;
            }
          };

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.5}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              className="flex-1 items-center pt-0.5"
              style={isFocused && [styles.active, { borderTopColor: "red" }]}
            >
              {getIcon()}
              <Text>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
export default BottomTabs;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
  },
  active: {
    borderTopWidth: 2,
  },
  tabLabelActive: {},
});
