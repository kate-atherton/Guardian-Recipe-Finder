import View from "./view.js";

class QueryView extends View {
  _parentElement = document.querySelector(".query");
  _errorMessage = "No search term was entered. Please try again";

  renderQuery(query) {
    this._clear();

    const searchedText = `Results for:${query}`;
    this._parentElement.insertAdjacentHTML("beforeend", searchedText);
  }
}

export default new QueryView();
