import { MovieType } from "../enums/movie";

export const MovieKey = {
  [MovieType.UPCOMING]: "upcoming",
  [MovieType.POPULAR]: "popular",
  [MovieType.NOW_PLAYING]: "now-playing",
} as const;
