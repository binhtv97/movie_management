import { ROUTE_KEY } from "./route_key";
export type NavBundle = {};

export type DetailBundle = NavBundle & {
  id: number;
  item: string;
};
export type NavigationParamsList = {
  [ROUTE_KEY.Detail]: DetailBundle;
};
