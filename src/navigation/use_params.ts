import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { NavigationParamsList } from "./navigation";

export const useParams = <ScreenName extends keyof NavigationParamsList>() => {
  const params = useLocalSearchParams();

  const parsedParams = useMemo(
    () =>
      Object.keys(params).reduce((acc, key) => {
        let value: any = params[key];

        if (!value) {
          return acc;
        }
        if (["true", "false"].includes(value)) {
          value = value === "true";
        }

        return { ...acc, [key]: value };
      }, {} as NonNullable<NavigationParamsList[ScreenName]>),
    [params]
  );

  return parsedParams;
};
