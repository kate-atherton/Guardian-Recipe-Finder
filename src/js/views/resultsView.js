import icons from "../../../static/img/icons.svg";
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
        <div id="${post.id}" class="recipe">
            <img class="recipe__image" src="${post.image}" alt="${post.title}">
            <div class="recipe__details">
            <svg class="recipe__bookmarkBtn">
                  <use class="recipe__bookmarkIcon" href="${icons}#icon-bookmark${
      post.bookmarked ? "-fill" : ""
    }"></use>
                </svg>
                <h1 class="recipe__header">${post.headline}</h1>
                <p class="recipe__description">${post.preview}</p>
                <a class="recipe__link" target="_blank" href="${
                  post.url
                }">Go to recipe</a>
          
                
            </div>
        </div>
    `;
  }

  addHandlerAddBookmark(handler) {
    document.querySelectorAll(".recipe__bookmarkBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const article = e.target.closest(".recipe");
        return handler(article.id, article);
      });
    });
  }

  activateBookmarkIcon(id) {
    document
      .getElementById(id)
      .querySelector(".recipe__bookmarkIcon")
      .setAttribute("href", `${icons}#icon-bookmark-fill`);
  }

  deactivateBookmarkIcon(id) {
    document
      .getElementById(id)
      .querySelector(".recipe__bookmarkIcon")
      .setAttribute("href", `${icons}#icon-bookmark`);
  }
}

export default new ResultsView();
