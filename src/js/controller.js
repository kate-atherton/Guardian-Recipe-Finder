import "../sass/main.scss";

import * as model from "./model.js";
import * as view from "./views/view.js";

console.log("test1");
console.log("test2");

model.test();

// document.body.appendChild(component());

// const controlSearchResults = async () => {
//   try {
//     resultsView.renderSpinner();

//     const query = searchView.getQuery();
//     if (!query) return;

//     //Load search results
//     await model.loadSearchResults(query);

//     //Render results
//     resultsView.render(model.getSearchResultsPage());

//     //Render initial pagination buttons
//     paginationView.render(model.state.search);
//   } catch (err) {
//     console.log(err);
//   }
// };

// const controlResults = async () => {
//   try {
//     const query = "sausages";
//     await model.loadResults(query);
//   } catch (err) {
//     view.renderError(err);
//   }
// };

// const init = function () {
//   view.addHandlerRender(controlResults);
// };

// init();
