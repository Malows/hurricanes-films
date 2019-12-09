import { apiRequest } from "./api";

const mdb = apiRequest(process.env.API_KEY || "");

export const getMovieByTitle = (title: string) =>
  mdb("search/movie")({ query: title });

export const getSimilarMovieById = (movieID: number) =>
  mdb(`movie/${movieID}/similar`)({});
