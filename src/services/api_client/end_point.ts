export const API_ENDPOINT = {
  movie: {
    popular: (page: number) => `3/movie/popular?language=en-US&page=${page}`,
    now_playing: (page: number) =>
      `3/movie/now_playing?language=en-US&page=${page}`,
    upcoming: (page: number) => `3/movie/upcoming?language=en-US&page=${page}`,
    detail: (id: number) => `3/movie/${id}`,
    search: (key: string, page: number) =>
      `3/search/movie?query=${encodeURIComponent(
        key
      )}&include_adult=false&language=vn-es&page=${page}`,
    credit: (id: number) => `3/movie/${id}/credits?language=en-US`,
  },
  genre: "3/genre/movie/list?language=en",
};
