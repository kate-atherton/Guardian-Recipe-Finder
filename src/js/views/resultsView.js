import icons from "../../../static/img/icons.svg";
import View from "./view.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _searchField = document.querySelector(".search__field");
  _searchedContainer = document.querySelector(".search__query");
  _sortField = document.querySelector(".sort");
  _errorMessage = "No results found for your query! Please try again";

  addHandlerRender(handler) {
    this._searchBtn.addEventListener("click", function (e) {
      e.preventDefault();
      return handler();
    });
  }

  //create dropdown menu element after search
  renderSortOption() {
    const markup = `
    <div class="dropdown">
      <button class="dropdown__btn">Sort by:</button>
      <div class="dropdown__content">
        <a href="#" id="relevance" class="dropdown__option dropdown__option--active">Relevance</a>
        <a href="#" id="newest" class="dropdown__option dropdown__option--inactive">Newest</a>
      </div>
    </div>
    `;
    if (!document.querySelector(".dropdown")) {
      this._sortField.insertAdjacentHTML("beforeend", markup);
    }
  }

  toggleSortWindow() {
    document
      .querySelector(".dropdown__content")
      .classList.toggle("dropdown__content--show");
  }

  addHandlerShowSort() {
    window.addEventListener("click", (e) => {
      if (
        e.target !== document.querySelector(".dropdown__btn") &&
        document
          .querySelector(".dropdown__content")
          .classList.contains("dropdown__content--show")
      ) {
        this.toggleSortWindow();
      }
    });
    document.querySelector(".dropdown__btn").addEventListener("click", (e) => {
      this.toggleSortWindow();
    });
  }

  // addHandlerRemoveSort() {

  // }

  //event listener to trigger sort when inactive button is clicked
  addHandlerSort(handler) {
    document
      .querySelector(".dropdown__content")
      .addEventListener("click", (e) => {
        const btn = e.target.closest(".dropdown__option");
        if (!btn || btn.classList.contains("dropdown__option--active")) return;

        document
          .querySelector(".dropdown__option--active")
          .classList.add("dropdown__option--inactive");
        document
          .querySelector(".dropdown__option--active")
          .classList.remove("dropdown__option--active");
        btn.classList.add("dropdown__option--active");
        btn.classList.remove("dropdown__option--inactive");

        return handler(btn.id);
      });
  }

  _clearInput() {
    this._searchField.value = "";
  }

  _clearSearched() {
    this._searchedContainer.textContent = "";
  }

  getQuery() {
    const query = this._searchField.value;
    this._clearInput();
    return query;
  }

  render(posts, query) {
    this._parentElement.innerHTML = "";
    this._clearSearched();

    const searchedText = `Results for:${query}`;
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
