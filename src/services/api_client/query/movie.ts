import { useQuery } from "@tanstack/react-query";
import { getDetail, getMovie } from "../interfaces/movie/movie_service";
import { MovieType } from "../enums/movie";
import { MovieKey } from "../queries_key/movie";

export const useGetMovie = (type: MovieType, page: number) => {
  const key = MovieKey[type];
  return useQuery({
    queryKey: [key, page],
    queryFn: () => getMovie(type, page),
  });
};

export const useGetMovieDetail = (id: number) => {
  return useQuery({
    queryKey: [id],
    queryFn: () => getDetail(id),
  });
};
