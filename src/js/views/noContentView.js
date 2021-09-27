import View from "./view.js";
import foodIcon from "../../../static/img/spinner.svg";

class noContentView extends View {
  _parentElement = document.querySelector(".nocontent");

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
