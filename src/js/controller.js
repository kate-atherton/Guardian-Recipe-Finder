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
    resultsView.renderSpinner();

    if (!alreadySearched) {
      const query = searchView.getQuery();

      if (!query) {
        clearPage();
        queryView.renderError();
        return;
      }
      if (!model.checkValidQuery(query)) {
        clearPage();
        queryView.renderError(
          "Please only included alphabetical characters in your search query"
        );
        return;
      }
      model.updateSearch(query);
    }

    await model.loadResults();

    //Render results
    resultsView.renderResults(model.state.posts);
    queryView.renderQuery(model.state.searched);

    //Updating bookmarks view
    bookmarksView.renderResults(model.state.bookmarks, controlRemoveBookmark);

    //Add a sort option
    sortView.renderSortOption(model.state.sort);
    sortView.removeHandlerDropdown();
    sortView.removeHandlerSort();
    sortView.addHandlerDropdown();
    sortView.addHandlerSort(controlSort);

    //Render initial pagination buttons
    paginationView.renderPagination(model.state);

    //Add bookmark event handler
    resultsView.addHandlerAddBookmark(controlBookmark);
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
