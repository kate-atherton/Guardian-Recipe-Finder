import { getData } from "./helpers.js";
import { API_URL, KEY, RES_PER_PAGE, TOTAL_RES } from "./config.js";

export const state = {
  posts: {},
  page: 1,
  resultsPerPage: RES_PER_PAGE,
};

export const loadResults = async (query) => {
  try {
    const data = await getData(
      `${API_URL}${query}&api-key=${KEY}&show-fields=all&show-tags=all&show-blocks=all&page-size=${TOTAL_RES}`
    );

    const results = data.response.results.map((art) => {
      return {
        headline: art.webTitle,
        image: art.fields.thumbnail,
        preview: art.fields.trailText,
        url: art.webUrl,
      };
    });

    state.posts = results;
    // state.page = 1;
  } catch (err) {
    console.error(err);
  }
};

export const getSearchResultsPage = (page = state.page) => {
  state.page = page;

  const start = (page - 1) * state.resultsPerPage;
  const end = page * state.resultsPerPage;

  return state.posts.slice(start, end);
};
