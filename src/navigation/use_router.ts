import { useRouter as useExpoRouter } from "expo-router";

import { ROUTE_KEY } from "./route_key";
import { NavigationParamsList } from "./navigation";

export const useRouter = () => {
  const router = useExpoRouter();

  const push = <K extends keyof NavigationParamsList>(
    routeKey: ROUTE_KEY,
    params?: NavigationParamsList[K]
  ) => {
    // @ts-ignore
    router.push({ pathname: `/${routeKey}`, params });
  };

  const replace = <K extends keyof NavigationParamsList>(
    routeKey: ROUTE_KEY,
    params?: NavigationParamsList[K]
  ) => {
    // @ts-ignore
    router.replace({ pathname: `/${routeKey}`, params });
  };

  const reset = <K extends keyof NavigationParamsList>(
    routeKey: ROUTE_KEY,
    params?: NavigationParamsList[K]
  ) => {
    if (router.canGoBack()) router.dismissAll();
    // @ts-ignore
    router.replace({ pathname: `/${routeKey}`, params });
  };

  const back = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
  };

  const navigate = <K extends keyof NavigationParamsList>(
    routeKey: ROUTE_KEY,
    params?: NavigationParamsList[K]
  ) => {
    // @ts-ignore
    router.navigate({ pathname: `/${routeKey}`, params });
  };

  return { push, replace, back, navigate, reset };
};
