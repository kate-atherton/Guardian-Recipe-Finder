import View from "./view.js";
import queryIcon from "../../../static/img/search.svg";

class QueryView extends View {
  _parentElement = document.querySelector(".query");
  _errorMessage = "No search term was entered. Please try again";

  renderQuery(query) {
    this._clear();

    const searchedText = `<p class="subtitle__text"> ${
      query === "default" ? "The Latest Articles" : `Results for: ${query}</p>`
    }`;

    this._parentElement.insertAdjacentHTML("beforeend", searchedText);
  }

  renderError(message = this._errorMessage) {
    const markup = `             
                <div class="query__error">
                      <img src="${queryIcon}" class="query__icon" alt="Query icon">
                    <p>${message}</p>
                </div>
                `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new QueryView();
