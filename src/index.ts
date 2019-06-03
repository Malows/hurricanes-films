import debounce from "lodash/debounce";
import "./css/style.css";
import { IState } from "./interfaces";
import Renderer from "./renders";
import { getMovieByTitle, getSimilarMovieById } from "./services";
import { sortByVote } from "./sort";

/**
 * Inicializo los nodos
 * Debería crearlos si no los encuenctro
 * para evitar el error de ser HTMLElement | null
 */
const title = document.getElementById("title");
const errorMessage = document.getElementById("errorMessage");
const similar = document.getElementById("films");
const detail = document.getElementById("detail");

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
  const titleContent = title.getAttribute("value").trim();

  if (!titleContent) {
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
function sendToSimilarMovies({ target }) {
  const elem = target.nodeName === "IMG"
    ? target.parentNode
    : target;

  getSimilarMovieById(elem.dataset.id)
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
