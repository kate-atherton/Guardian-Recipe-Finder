import "../sass/main.scss";
import * as model from "./model.js";
import resultsView from "./views/resultsView";
import View from "./views/view.js";
import paginationView from "./views/paginationView.js";

const controlResults = async () => {
  try {
    resultsView.renderSpinner();

    const query = resultsView.getQuery();
    if (!query) return;

    await model.loadResults(query);

    //Render results
    resultsView.render(model.getSearchResultsPage(), query);

    //Render initial pagination buttons
    paginationView.renderPagination(model.state);
  } catch (err) {
    resultsView.renderError(err);
  }
};

const controlPagination = (page) => {
  //  Render new results
  resultsView.render(model.getSearchResultsPage(page));

  //render new pagination buttons
  paginationView.renderPagination(model.state);
};

const init = function () {
  resultsView.addHandlerRender(controlResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
