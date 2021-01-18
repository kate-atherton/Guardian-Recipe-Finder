import icons from "../../../static/img/icons.svg";
import View from "./view.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _searchField = document.querySelector(".search__field");
  _searchedContainer = document.querySelector(".search__query");
  _errorMessage = "No results found for your query! Please try again";

  addHandlerRender(handler) {
    this._searchBtn.addEventListener("click", function (e) {
      e.preventDefault();
      return handler();
    });
  }

  _clearInput() {
    this._searchField.value = "";
  }

  getQuery() {
    const query = this._searchField.value;
    this._clearInput();
    return query;
  }

  render(posts, query) {
    this._parentElement.innerHTML = "";

    const searchedText = `Results for ${query}`;
    this._searchedContainer.insertAdjacentHTML("beforeend", searchedText);

    posts.forEach((post) => {
      const markup = this._generateMarkup(post);
      this._parentElement.insertAdjacentHTML("beforeend", markup);
    });
  }

  _generateMarkup(post) {
    return `
        <div class="recipe">
            <img class="recipe__image" src="${post.image}" alt="${post.title}">
            <div class="recipe__details">
                <h1 class="recipe__header">${post.headline}</h1>
                <p class="recipe__description">${post.preview}</p>
                <a class="recipe__link" target="_blank" href="${post.url}">Go to recipe</a>
            </div>
        </div>
    `;
  }
}

export default new ResultsView();
