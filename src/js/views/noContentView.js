import View from "./view.js";
import queryIcon from "../../../static/img/search.svg";
import foodIcon from "../../../static/img/spinner.svg";

class noContentView extends View {
  _parentElement = document.querySelector(".nocontent");

  renderError(message) {
    const markup = `             
                <div class="nocontent__message">
                    <img src="${queryIcon}" class="nocontent__icon" alt="Query icon">
                    <p>${message}</p>
                </div>
                `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner() {
    const markup = `
                  <div class="nocontent__spinner">
                    <img src="${foodIcon}" class="nocontent__spinner__icon" alt="Spinner icon">
                  </div>
                `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
export default new noContentView();
