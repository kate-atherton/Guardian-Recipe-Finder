import icons from "../../../static/img/icons.svg";
import foodIcon from "../../../static/img/spinner.svg";

export default class View {
  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
                  <div class="spinner">
                    <img src="${foodIcon}" class="spinner__icon" alt="Spinner icon">
                  </div>
                `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
                  <div class="error">
                    <div>
                        <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                        </svg>
                    </div>
                    <p>${message}</p>
                   </div>
                  `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
