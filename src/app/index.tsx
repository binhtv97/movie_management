import LogoImage from "@/assets/logo";
import { ScreenContainer } from "@/components/Container";
import { ROUTE_KEY } from "@/navigation/route_key";
import { useRouter } from "@/navigation/use_router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

const SplashScreen = () => {
  const { replace } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      replace(ROUTE_KEY.Home);
    }, 1000);
  }, []);
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <LogoImage />
      </View>
    </ScreenContainer>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
