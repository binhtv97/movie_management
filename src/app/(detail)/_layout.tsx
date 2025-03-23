import { ROUTE_KEY } from "@/navigation/route_key";
import { Stack } from "expo-router";

const DetailLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name={ROUTE_KEY.Detail} />
    </Stack>
  );
};
export default DetailLayout;
