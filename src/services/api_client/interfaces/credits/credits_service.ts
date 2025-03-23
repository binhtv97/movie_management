import { getRequest } from "../../api";
import { API_ENDPOINT } from "../../end_point";

export const getCredit = async (id: number): Promise<MovieDetailResponse> => {
  return await getRequest({
    path: API_ENDPOINT.movie.credit(id),
  });
};
