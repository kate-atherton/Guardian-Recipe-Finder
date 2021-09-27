import queryIcon from "../../../static/img/search.svg";

export default class View {
  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderError(message) {
    const markup = `
                  <div class="message">               
                      <img src="${queryIcon}" class="message__icon" alt="Query icon">
                      <p>${message}</p>
                  </div>
                  `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
