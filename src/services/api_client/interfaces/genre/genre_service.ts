import { getRequest } from "../../api";
import { API_ENDPOINT } from "../../end_point";

export const getGenre = async (): Promise<GetGenResponse> => {
  return await getRequest({
    path: API_ENDPOINT.genre,
  });
};
