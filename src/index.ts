import debounce from "lodash/debounce";
import "./css/style.css";
import { IState } from "./interfaces";
import Renderer from "./renders";
import { getMovieByTitle, getSimilarMovieById } from "./services";
import { sortByVote } from "./sort";

/**
 * Referencia fuerte a los nodos necesarios
 */
const title = document.getElementById("title") as HTMLInputElement;
const errorMessage = document.getElementById("errorMessage") as HTMLElement;
const similar = document.getElementById("films") as HTMLElement;
const detail = document.getElementById("detail") as HTMLElement;

/**
 * Si no existen los nodos necesarios detengo la app
 * Siempre existen porque son parte del html inicial
 */
// if (!errorMessage || !title || !similar || !detail) {
//   throw Error('Undefined HTML nodes');
// }

/**
 * El estado de la app
 */
const state: IState = {
  detail: null,
  error: null,
  similar: null,
};

/**
 * Inicializo mi funcion de render inyectando los nodos
 */
const render = Renderer(state, errorMessage, similar, detail);

/**
 * Esto puede ir en otro archivo
 * Además hay que pasar la función que quiero agregar al ciclo de render
 * y es `sendToSimilarMovies`
 */
title.addEventListener("keyup", debounce(() => {
  const titleContent = title.value.trim();

  if (titleContent.length === 0) {
    state.similar = null;
    state.error = "¿Estas seguro que esa es tu peli favorita? No me suena.";
    state.detail = null;
    return undefined;
  }

  getMovieByTitle(titleContent)
    .then(({ results }) => {
        state.detail = null;

        if (!results || results.length === 0) {
          state.error = "¿Estas seguro que esa es tu peli favorita? No me suena.";
          state.similar = null;
        } else {
          state.similar = results.sort(sortByVote).slice(0, 12);
          state.error = null;
        }

        render();
      });
}, 500));

/**
 * Esta función tiene que llegar a render -> refactorización
 */
export function sendToSimilarMovies(elem: HTMLElement) {

  // const elem: HTMLElement = <HTMLElement>this;
  // const target = event
  // const elem = target !== null && target.nodeName === "IMG"
  //   ? target.parentNode
  //   : target;

  const movieId = parseInt(elem.dataset.id || "", 10);

  getSimilarMovieById(movieId)
    .then(({ results }) => {
      state.similar = null;

      if (!results || results.length === 0) {
        state.error = "¿Estas seguro que esa es tu peli favorita? No me suena.";
        state.detail = null;
      } else {
        state.detail = results;
        state.error = null;
      }

      render();
    });
}
