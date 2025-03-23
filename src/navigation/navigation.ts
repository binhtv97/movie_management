import { ROUTE_KEY } from "./route_key";
export type NavBundle = {};

export type DetailBundle = NavBundle & {
  id: number;
};
export type NavigationParamsList = {
  [ROUTE_KEY.Detail]: DetailBundle;
};
