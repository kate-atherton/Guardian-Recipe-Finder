import "../sass/main.scss";
import * as model from "./model.js";
import resultsView from "./views/resultsView";
import View from "./views/view.js";
import paginationView from "./views/paginationView.js";
import searchView from "./views/searchView";
import sortView from "./views/sortView";
import queryView from "./views/queryView";
import tabView from "./views/tabView";
import bookmarksView from "./views/bookmarksView";

const clearPage = () => {
  resultsView._clear();
  paginationView._clear();
  searchView._clear();
  queryView._clear();
  sortView._clear();
};

const controlResults = async (alreadySearched, page = 1) => {
  try {
    clearPage();
    model.updatePage(page);
    let query;

    if (!alreadySearched) {
      query = searchView.getQuery();
      model.updateSearch(query);
      if (!query) {
        clearPage();
        queryView.renderError(
          "You did not enter a search query, please try again"
        );
        return;
      } else if (!model.checkValidQuery(query)) {
        clearPage();
        queryView.renderError(
          "Please only included alphabetical characters in your search query"
        );
        return;
      }
    }

    resultsView.renderSpinner();
    await model.loadResults();

    //sort and pagination should only load if there are results!

    if (Object.keys(model.state.posts).length === 0) {
      queryView.renderError("There were no results for your query");
      resultsView._clear();
      return;
    }

    resultsView.renderResults(model.state.posts);
    queryView.renderQuery(model.state.searched);
    paginationView.renderPagination(model.state);

    //Updating bookmarks view
    bookmarksView.renderResults(model.state.bookmarks, controlRemoveBookmark);

    //check if its default or not
    //Add a sort option
    if (model.state.searched !== "default") {
      sortView.renderSortOption(model.state.sort);
      sortView.removeHandlerDropdown();
      sortView.removeHandlerSort();
      sortView.addHandlerDropdown();
      sortView.addHandlerSort(controlSort);
    }

    //Add bookmark event handler
    resultsView.addHandlerAddBookmark(controlBookmark);
  } catch (err) {
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
  model.updatePage(page);
  controlResults(true, page);
};

const controlTab = () => {
  model.updateTab();
  tabView.moveTab(model.state.activeTab, model.state.inactiveTab);
};

const controlBookmark = (uniqueId) => {
  let articleToBookmark = model.state.posts.find(
    (element) => element.id === uniqueId
  );

  if (!articleToBookmark.bookmarked) {
    model.addBookmark(articleToBookmark);
    articleToBookmark.bookmarked = true;
    resultsView.activateBookmarkIcon(uniqueId);
  } else {
    model.deleteBookmark(articleToBookmark);
    articleToBookmark.bookmarked = false;
    resultsView.deactivateBookmarkIcon(uniqueId);
  }

  bookmarksView.renderResults(model.state.bookmarks, controlRemoveBookmark);
};

const controlRemoveBookmark = (uniqueId) => {
  let articleToRemove = model.state.bookmarks.find(
    (element) => element.id === uniqueId
  );
  model.deleteBookmark(articleToRemove);
  bookmarksView.renderResults(model.state.bookmarks, controlRemoveBookmark);
  controlResults(true);
};

const init = function () {
  searchView.addHandlerRender(controlResults);
  paginationView.addHandlerClick(controlPagination);
  tabView.addHandlerMoveTab(controlTab);
  bookmarksView.renderResults(model.state.bookmarks, controlRemoveBookmark);
};

init();
