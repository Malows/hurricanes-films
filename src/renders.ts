import { sendToSimilarMovies } from "./index";
import { IMovie, IState } from "./interfaces";

const printPosterUrl = (movie: IMovie): string =>
  `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

const movieToListItem = (movie: IMovie): string =>
  `<li data-id="${movie.id}">${movie.title}</li>`;

const movieToCard = (movie: IMovie): string =>
  `<div class="nes-container with-title  movie-card" data-id="${movie.id}">
    <p class="title">${movie.title.length < 30 ? movie.title : movie.title.slice(0, 27) + " ..."}</p>
    <img src="${printPosterUrl(movie)}" class="movie-card__img"/>
  </div>`;

const movieToDetail = (movie: IMovie) =>
`<div class="nes-container with-title">
    <p class="title">${movie.title}</p>
    <div class="grid-2">
      <img src="${printPosterUrl(movie)}" class="detail__img"/>
      <p style="margin: 0 5rem">${movie.overview}</p>
    </div>
  </div>`;

const moviesToList = (movies: IMovie[]): string => movies.map(movieToListItem).join("");

const moviesCards = (movies: IMovie[]): string => movies.map(movieToCard).join("");

//
// renders
//
function renderError(state: IState, node: HTMLElement) {
  if (!state.error) {
    node.style.display = "none";
    return undefined;
  }

  node.style.display = "block";
  node.innerHTML = state.error;
}

function renderGrid(state: IState, node: HTMLElement, func: any) {
  if (!state.similar) {
    node.style.display = "none";
    return undefined;
  }

  node.style.display = "grid";
  node.innerHTML = moviesCards(state.similar);

  const cards = Array.from(document.getElementsByClassName("movie-card")) as HTMLElement[];

  cards.forEach((card) => card.addEventListener("click", func));
}

function renderDetail(state: IState, node: HTMLElement) {
  if (!state.detail) {
    node.style.display = "none";
    return undefined;
  }
  node.style.display = "block";
  node.innerHTML = movieToDetail(state.detail[0]);
}

export default function(
  state: IState,
  errorNode: HTMLElement,
  similarNode: HTMLElement,
  detailNode: HTMLElement,
): () => void {
  return () => {
    renderDetail(state, detailNode);
    renderError(state, errorNode);
    renderGrid(state, similarNode, sendToSimilarMovies);
  };
}
