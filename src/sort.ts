import { IMovie } from "./interfaces";

export function sortByVote(a: IMovie, b: IMovie): number {
  return b.popularity * b.vote_average - a.popularity * a.vote_average;
}

export function sortByPolularity(a: IMovie, b: IMovie): number {
  return b.popularity - a.popularity;
}
