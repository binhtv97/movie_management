import { useQuery } from "@tanstack/react-query";
import { GenreKey } from "../queries_key/genre";
import { getGenre } from "../interfaces/genre/genre_service";

export const useGetGenre = () => {
  return useQuery({
    queryKey: [GenreKey.get],
    queryFn: () => getGenre(),
  });
};
