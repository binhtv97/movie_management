import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { ReactQueryProvider } from "../provider/react_query_provider";
import { LogBox } from "react-native";

if (__DEV__) {
  require("../../ReactotronConfig");
  const ignoreErrors = [
    "Support for defaultProps will be removed", //https://github.com/meliorence/react-native-render-html/issues/661
    'You seem to update props of the "TRenderEngineProvider"',
    "TNodeChildrenRenderer",
    "MemoizedTNodeRenderer",
  ];

  const ignoreWarnings = [
    "Support for defaultProps will be removed",
    'You seem to update props of the "TRenderEngineProvider"',
  ];

  const error = console.error;
  console.error = (...arg) => {
    for (const error of ignoreErrors) if (arg[0].includes(error)) return;
    error(...arg);
  };

  const warn = console.warn;
  console.warn = (...arg) => {
    for (const warn of ignoreWarnings) if (arg[0].includes(warn)) return;
    warn(...arg);
  };

  LogBox.ignoreLogs(ignoreErrors);
}
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ReactQueryProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ReactQueryProvider>
  );
}
