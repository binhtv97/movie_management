import { getRequest } from "../../api";
import { API_ENDPOINT } from "../../end_point";
import { MovieType } from "../../enums/movie";

export const getMovie = async (
  type: MovieType,
  page: number
): Promise<GetMovieResponse> => {
  let path = "";
  if (type === MovieType.NOW_PLAYING) {
    path = API_ENDPOINT.movie.now_playing(page);
  }

  if (type === MovieType.POPULAR) {
    path = API_ENDPOINT.movie.popular(page);
  }
  if (type === MovieType.UPCOMING) {
    path = API_ENDPOINT.movie.upcoming(page);
  }
  return await getRequest({
    path: path,
  });
};

export const getDetail = async (
  id: number
): Promise<GetMovieDetailResponse> => {
  return await getRequest({
    path: API_ENDPOINT.movie.detail(id),
  });
};

export const getMovieInfo = async (id: number) => {};
