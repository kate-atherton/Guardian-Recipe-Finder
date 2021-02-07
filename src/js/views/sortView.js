import View from "./view.js";

class sortView extends View {
  _parentElement = document.querySelector(".sort");
  _dropDownBtn;
  _btnDropdownHandler;
  _windowDropdownHandler;
  _sortHandler;
  _sortResultsHandler;

  //create dropdown menu element after search
  renderSortOption(active) {
    const markup = `
    <div class="dropdown">
      <button class="dropdown__btn">Sort by:</button>
      <div class="dropdown__content">
        <a href="#" id="relevance" class="dropdown__option ${
          active === "relevance"
            ? "dropdown__option--active"
            : "dropdown__option--inactive"
        }">Relevance</a>
        <a href="#" id="newest" class="dropdown__option ${
          active === "newest"
            ? "dropdown__option--active"
            : "dropdown__option--inactive"
        }">Newest</a>
      </div>
    </div>
    `;
    if (!document.querySelector(".dropdown")) {
      this._parentElement.insertAdjacentHTML("beforeend", markup);
    }
    this._dropDownBtn = document.querySelector(".dropdown__option--active");
  }

  _toggleDropdown() {
    document
      .querySelector(".dropdown__option--inactive")
      .classList.toggle("dropdown__option--inactive--show");
  }

  _btnInitToggle() {
    this._toggleDropdown();
  }

  _outsideInitToggle(e) {
    if (
      !this._parentElement.contains(e.target) &&
      document
        .querySelector(".dropdown__option--inactive")
        .classList.toggle("dropdown__option--inactive--show")
    ) {
      this._toggleDropdown();
    }
  }

  addHandlerDropdown() {
    this._windowDropdownHandler = this._outsideInitToggle.bind(this);
    window.addEventListener("click", this._windowDropdownHandler);
    this._btnDropdownHandler = this._btnInitToggle.bind(this);
    this._dropDownBtn.addEventListener("click", this._btnDropdownHandler);
  }

  //remove handler show sort
  removeHandlerDropdown() {
    window.removeEventListener("click", this._windowDropdownHandler);
    this._dropDownBtn.removeEventListener("click", this._btnDropdownHandler);
  }

  _sortResults = (e) => {
    e.preventDefault();
    const btn = e.target.closest(".dropdown__option");
    if (!btn || btn.classList.contains("dropdown__option--active")) return;
    return this._sortHandler(btn.id);
  };

  //event listener to trigger sort when inactive button is clicked
  addHandlerSort(handler) {
    this._sortHandler = handler;
    this._sortResultsHandler = this._sortResults.bind(this);
    this._parentElement
      .querySelector(".dropdown__content")
      .addEventListener("click", this._sortResultsHandler);
  }

  removeHandlerSort() {
    this._parentElement
      .querySelector(".dropdown__content")
      .removeEventListener("click", this._sortResultsHandler);
  }
}

export default new sortView();
