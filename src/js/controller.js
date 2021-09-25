import "../sass/main.scss";
import * as model from "./model.js";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView.js";
import searchView from "./views/searchView";
import sortView from "./views/sortView";
import queryView from "./views/queryView";
import tabView from "./views/tabView";
import bookmarksView from "./views/bookmarksView";
import noContentView from "./views/noContentView";

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
        noContentView.renderError(
          "You did not enter a search query, please try again"
        );
        return;
      } else if (!model.checkValidQuery(query)) {
        clearPage();
        noContentView.renderError(
          "Please only include alphabetical characters in your search query"
        );
        return;
      }
    }

    noContentView.renderSpinner();
    await model.loadResults();

    if (Object.keys(model.state.posts).length === 0) {
      noContentView.renderError("There were no results for your query");
      return;
    }

    noContentView._clear();
    resultsView.renderResults(model.state.posts);
    queryView.renderQuery(model.state.searched);
    paginationView.renderPagination(model.state);

    bookmarksView.renderResults(model.state.bookmarks, controlRemoveBookmark);

    if (model.state.searched !== "default") {
      sortView.renderSortOption(model.state.sort);
      sortView.removeHandlerDropdown();
      sortView.removeHandlerSort();
      sortView.addHandlerDropdown();
      sortView.addHandlerSort(controlSort);
    }

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
  resultsView.scrollToTop();
  model.updatePage(page);
  controlResults(true, page);
};

const controlTab = () => {
  model.updateTab();
  tabView.moveTab(model.state.activeTab, model.state.inactiveTab);
};

const controlBookmark = (uniqueId) => {
  const articleToBookmark = model.state.posts.find(
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
  const articleToRemove = model.state.bookmarks.find(
    (element) => element.id === uniqueId
  );
  model.deleteBookmark(articleToRemove);
  bookmarksView.renderResults(model.state.bookmarks, controlRemoveBookmark);
  controlResults(true);
};

const init = () => {
  searchView.addHandlerRender(controlResults);
  paginationView.addHandlerClick(controlPagination);
  tabView.addHandlerMoveTab(controlTab);
  bookmarksView.renderResults(model.state.bookmarks, controlRemoveBookmark);
};

init();
