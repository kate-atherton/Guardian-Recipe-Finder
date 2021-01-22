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

  _clearInput() {
    this._parentElement.value = "";
  }

  getQuery() {
    const query = this._parentElement.value;
    this._clearInput();
    return query;
  }
}

export default new searchView();
