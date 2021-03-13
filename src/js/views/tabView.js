import View from "./view.js";

class tabView extends View {
  addHandlerMoveTab(handler) {
    document.querySelector(".nav").addEventListener("click", (e) => {
      //hide section which is not selected??
      const tab = e.target.closest(".nav__link");
      const tabContainer = document.querySelector(`.${tab.id}`).parentElement;

      if (!tab || !tabContainer.classList.contains("tabcontent__inactive")) {
        return;
      }
      return handler(tab.id);
    });
  }

  moveTab(activeTab, inactiveTab) {
    document
      .querySelector(`.${activeTab}`)
      .parentElement.classList.remove("tabcontent__inactive");
    document
      .querySelector(`.${inactiveTab}`)
      .parentElement.classList.add("tabcontent__inactive");
  }
}

export default new tabView();
