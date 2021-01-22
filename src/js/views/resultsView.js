import View from "./view.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No results found for your query! Please try again";

  renderResults(posts) {
    this._clear();

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
