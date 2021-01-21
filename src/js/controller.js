import "../sass/main.scss";
import * as model from "./model.js";
import resultsView from "./views/resultsView";
import View from "./views/view.js";
import paginationView from "./views/paginationView.js";

const controlResults = async (sort) => {
  try {
    console.log("results being loaded");
    resultsView.renderSpinner();

    let query;

    if (!sort) {
      query = resultsView.getQuery();
      if (!query) {
        return;
      }
    } else {
      query = model.state.searched;
    }

    await model.loadResults(query);

    //Render results
    resultsView.render(model.getSearchResultsPage(), model.state.searched);

    //Add a sort option
    resultsView.renderSortOption();
    resultsView.addHandlerShowSort();
    resultsView.addHandlerSort(controlSort);

    //Render initial pagination buttons
    paginationView.renderPagination(model.state);
  } catch (err) {
    resultsView.renderError(err);
  }
};

const controlSort = async (sortOption) => {
  model.updateSort(sortOption);
  controlResults(model.state.sort);
};

const controlPagination = (page) => {
  //  Render new results

  resultsView.render(model.getSearchResultsPage(page), model.state.searched);

  //render new pagination buttons
  paginationView.renderPagination(model.state);
};

const init = function () {
  resultsView.addHandlerRender(controlResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
