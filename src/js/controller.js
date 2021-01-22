import "../sass/main.scss";
import * as model from "./model.js";
import resultsView from "./views/resultsView";
import View from "./views/view.js";
import paginationView from "./views/paginationView.js";
import searchView from "./views/searchView";
import sortView from "./views/sortView";
import queryView from "./views/queryView";

const clearPage = () => {
  resultsView._clear();
  paginationView._clear();
  searchView._clear();
  queryView._clear();
  sortView._clear();
};

const controlResults = async (sort) => {
  try {
    clearPage();
    model.updatePage();
    resultsView.renderSpinner();

    if (!sort) {
      const query = searchView.getQuery();
      if (!query) {
        clearPage();
        queryView.renderError();
        return;
      }
      model.updateSearch(query);
    }

    await model.loadResults();

    //Render results
    resultsView.renderResults(model.state.posts);
    queryView.renderQuery(model.state.searched);

    //Add a sort option
    sortView.renderSortOption(model.state.sort);
    sortView.removeHandlerDropdown();
    sortView.removeHandlerSort();
    sortView.addHandlerDropdown();
    sortView.addHandlerSort(controlSort);

    //Render initial pagination buttons
    paginationView.renderPagination(model.state);
  } catch (err) {
    console.log(err);
    resultsView.renderError(err);
  }
};

const controlSort = (sortOption) => {
  sortView.removeHandlerDropdown();
  sortView.removeHandlerSort();
  model.updateSort(sortOption);
  model.updatePage();
  controlResults(true);
};

const controlPagination = async (page) => {
  try {
    //  Render new results
    //can this be destructured?
    model.updatePage(page);
    await model.loadResults();
    resultsView.renderResults(model.state.posts);

    queryView.renderQuery(model.state.searched);

    //render new pagination buttons
    paginationView.renderPagination(model.state);
  } catch (err) {
    console.log(err);
    resultsView.renderError(err);
  }
};

const init = function () {
  searchView.addHandlerRender(controlResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
