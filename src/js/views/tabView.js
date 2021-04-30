import View from "./view.js";

class tabView extends View {
  addHandlerMoveTab(handler) {
    document.querySelector(".nav").addEventListener("click", (e) => {
      const tab = e.target.closest(".nav__link");
      if (!tab) {
        return;
      }
      const tabContainer = document.querySelector(`.${tab.id}`).parentElement;
      if (!tabContainer.classList.contains("tabcontent__inactive")) {
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
