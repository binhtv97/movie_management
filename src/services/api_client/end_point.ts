export const API_ENDPOINT = {
  movie: {
    popular: (page: number) => `3/movie/popular?language=en-US&page=${page}`,
    now_playing: (page: number) =>
      `3/movie/now_playing?language=en-US&page=${page}`,
    upcoming: (page: number) => `3/movie/upcoming?language=en-US&page=${page}`,
  },
};
