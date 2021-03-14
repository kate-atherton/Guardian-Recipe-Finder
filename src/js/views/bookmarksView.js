import View from "./view.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__results");

  renderResults(bookmarks, handler) {
    this._clear();

    bookmarks.forEach((bookmark) => {
      const markup = this._generateMarkup(bookmark);
      this._parentElement.insertAdjacentHTML("beforeend", markup);
      this.addHandlerRemoveBookmark(handler, bookmark.id);
    });
  }

  _generateMarkup(bookmark) {
    return `
        <div id="bookmark-${bookmark.id}" class="bookmark">
            <img class="bookmark__image image" src="${bookmark.image}" alt="${bookmark.title}">
            <div class="bookmark__details">
                <h1 class="bookmark__header">${bookmark.headline}</h1>
                <p class="bookmark__description">${bookmark.preview}</p>
                <a class="bookmark__link link" target="_blank" href="${bookmark.url}">Go to recipe</a>
                <span class="bookmark__delete fa fa-trash"></span>
            </div>
        </div>
    `;
  }

  addHandlerRemoveBookmark(handler, id) {
    document
      .getElementById(`bookmark-${id}`)
      .querySelector(".bookmark__delete")
      .addEventListener("click", () => {
        return handler(id);
      });
  }
}

export default new BookmarksView();
