import View from "./view.js";

class sortView extends View {
  _parentElement = document.querySelector(".sort");
  _dropDownBtn;
  _btnDropdownHandler;
  _windowDropdownHandler;

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
      this._parentElement.insertAdjacentHTML("beforeend", markup);
    }
    this._dropDownBtn = document.querySelector(".dropdown__btn");
  }

  _toggleDropdown() {
    document
      .querySelector(".dropdown__content")
      .classList.toggle("dropdown__content--show");
  }

  _btnInitToggle() {
    this._toggleDropdown();
  }

  _outsideInitToggle(e) {
    if (
      !this._parentElement.contains(e.target) &&
      document
        .querySelector(".dropdown__content")
        .classList.contains("dropdown__content--show")
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

  //event listener to trigger sort when inactive button is clicked
  addHandlerSort(handler) {
    this._parentElement
      .querySelector(".dropdown__content")
      .addEventListener("click", (e) => {
        const btn = e.target.closest(".dropdown__option");
        if (!btn || btn.classList.contains("dropdown__option--active")) return;

        this._parentElement
          .querySelector(".dropdown__option--active")
          .classList.add("dropdown__option--inactive");
        this._parentElement
          .querySelector(".dropdown__option--active")
          .classList.remove("dropdown__option--active");
        btn.classList.add("dropdown__option--active");
        btn.classList.remove("dropdown__option--inactive");

        return handler(btn.id);
      });
  }
}

export default new sortView();
