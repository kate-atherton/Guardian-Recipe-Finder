import "../sass/main.scss";
import * as model from "./model.js";
import resultsView from "./views/resultsView";
import View from "./views/view.js";
import paginationView from "./views/paginationView.js";
import searchView from "./views/searchView";
import sortView from "./views/sortView";

const controlResults = async (sort) => {
  try {
    resultsView.renderSpinner();

    let query;

    if (!sort) {
      query = searchView.getQuery();
      if (!query) {
        resultsView._clear();
        paginationView._clear();
        searchView._clear();
        return;
      }
    } else {
      query = model.state.searched;
    }

    await model.loadResults(query);

    //Render results
    resultsView.renderResults(
      model.getSearchResultsPage(),
      model.state.searched
    );

    //Add a sort option
    sortView.renderSortOption();
    sortView.removeHandlerDropdown();
    sortView.addHandlerDropdown();
    sortView.addHandlerSort(controlSort);

    //Render initial pagination buttons
    paginationView.renderPagination(model.state);
  } catch (err) {
    console.log(err);
    resultsView.renderError(err);
  }
};

const controlSort = async (sortOption) => {
  sortView.removeHandlerDropdown();
  model.updateSort(sortOption);
  controlResults(model.state.sort);
};

const controlPagination = (page) => {
  //  Render new results
  resultsView.renderResults(
    model.getSearchResultsPage(page),
    model.state.searched
  );

  //render new pagination buttons
  paginationView.renderPagination(model.state);
};

const init = function () {
  searchView.addHandlerRender(controlResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
