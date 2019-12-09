export interface IMovie {
  id: number;
  title: string;
  popularity: number;
  vote_average: number;
  poster_path: string;
  overview: string;
}

export interface IState {
  detail: IMovie[] | null;
  error: string | null;
  similar: IMovie[] | null;
}
