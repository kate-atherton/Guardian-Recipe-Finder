import View from "./view.js";

class QueryView extends View {
  _parentElement = document.querySelector(".query");
  _errorMessage = "No search term was entered. Please try again";

  renderQuery(query) {
    console.log(query);
    this._clear();

    const searchedText = `<p class="query__text"> ${
      query === "default" ? "The Latest Articles" : `Results for: ${query}</p>`
    }`;

    this._parentElement.insertAdjacentHTML("beforeend", searchedText);
  }
}

export default new QueryView();
