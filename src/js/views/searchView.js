import View from "./view.js";

class searchView extends View {
  _parentElement = document.querySelector(".search__field");
  _searchBtn = document.querySelector(".search__btn");

  addHandlerRender(handler) {
    this._searchBtn.addEventListener("click", function (e) {
      e.preventDefault();
      return handler();
    });
  }

  //are these the same?
  _clearSearched() {
    this._searchedContainer.textContent = "";
  }

  _clearInput() {
    this._searchField.value = "";
  }

  getQuery() {
    const query = this._parentElement.value;
    this._clear();
    return query;
  }
}

export default new searchView();
