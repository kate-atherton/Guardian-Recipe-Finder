import View from "./view.js";

class tabView extends View {
  _parentElement = document.querySelector(".tab");

  addHandlerMoveTab(handler) {
    document.querySelector(".tab").addEventListener("click", (e) => {
      //hide section which is not selected??
      const tab = e.target.closest(".tab__link");

      if (
        !tab ||
        !document
          .querySelector(`.${tab.id}`)
          .classList.contains("tabcontent__inactive")
      ) {
        return;
      }
      return handler(tab.id);
    });
  }

  moveTab(activeTab, inactiveTab) {
    document
      .querySelector(`.${activeTab}`)
      .classList.remove("tabcontent__inactive");
    document
      .querySelector(`.${inactiveTab}`)
      .classList.add("tabcontent__inactive");
  }
}

export default new tabView();
