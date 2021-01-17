// export default class View {
//   addHandlerRender(handler) {
//     window.addEventListener("load", handler);
//   }

//   _clear() {
//     this._parentElement.innerHTML = "";
//   }

//   renderSpinner() {
//     const markup = `
//                   <div class="spinner">
//                     <svg>
//                       <use href="${icons}#icon-loader"></use>
//                     </svg>
//                   </div>
//                 `;
//     this._clear();
//     this._parentElement.insertAdjacentHTML("afterbegin", markup);
//   }

//   renderError(message = this._errorMessage) {
//     const markup = `
//                   <div class="error">
//                     <div>
//                         <svg>
//                         <use href="${icons}#icon-alert-triangle"></use>
//                         </svg>
//                     </div>
//                     <p>${message}</p>
//                    </div>
//                   `;
//     this._clear();
//     this._parentElement.insertAdjacentHTML("afterbegin", markup);
//   }
// }
