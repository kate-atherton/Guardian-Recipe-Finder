import View from "./view.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");
  _pageTop = document.querySelector(".container");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".pagination__btn");
      if (!btn || btn.classList.contains("pagination__btn--active")) return;

      const goToPage = btn.classList.contains("pagination__arrow")
        ? btn.dataset.goto
        : btn.textContent;

      handler(goToPage);

      this._pageTop.scrollIntoView({ behavior: "smooth" });
    });
  }

  renderPagination(state) {
    const curPage = parseInt(state.page);
    const numPages = state.totalPages;
    // const numPages = Math.ceil(state.posts.length / state.resultsPerPage);
    this._clear();
    const markup = this._generateMarkup(curPage, numPages);
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _generateMarkup(curPage, numPages) {
    const getPages = (curPage, numPages) => {
      const pageRange = [
        ...new Set([1, , curPage - 1, curPage, curPage + 1, numPages]),
      ].filter((page) => page >= 1 && page <= numPages);

      if (pageRange[1] > 2) {
        pageRange.splice(1, 0, "...");
      }

      if (numPages - pageRange[pageRange.length - 2] > 1) {
        pageRange.splice(pageRange.length - 1, 0, "...");
      }

      return pageRange;
    };

    const allPages = getPages(curPage, numPages);

    let buttonHtml = ``;

    allPages.forEach((button) => {
      buttonHtml += `<button class= "pagination__${
        typeof button === "number" ? "btn" : "dots"
      }${button === curPage ? "--active" : ""}">${button}</button>`;
    });

    return `
      <button class="pagination__btn pagination__btn${
        curPage !== 1 ? "" : "--active"
      } pagination__arrow"
        
      }" data-goto="${curPage - 1}">Previous</button>
      ${buttonHtml}
      <button class="pagination__btn pagination__btn${
        curPage !== numPages ? "" : "--active"
      } pagination__arrow" data-goto="${curPage + 1}">Next</button>
    `;
  }
}

export default new PaginationView();
