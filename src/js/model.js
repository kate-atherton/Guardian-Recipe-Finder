import { getData } from "./helpers.js";
import { API_URL, KEY, RES_PER_PAGE, TOTAL_RES } from "./config.js";

export const state = {
  posts: {},
  page: 1,
  resultsPerPage: RES_PER_PAGE,
  searched: "",
  sort: "relevance",
};

export const loadResults = async (query) => {
  console.log("starting results search");
  state.searched = query;

  if (/\s/.test(query)) {
    query = query.split(" ").join("%20AND%20");
  }

  try {
    const data = await getData(
      `${API_URL}${query}&api-key=${KEY}&order-by=${state.sort}&show-fields=all&show-tags=all&show-blocks=all&show-elements=all&page-size=${TOTAL_RES}`
    );

    const placeholderImg = "../...static/img/Hangman12.png";

    const results = data.response.results.map((art) => {
      return {
        headline: art.webTitle,
        image: [
          art.fields.thumbnail,
          art.blocks.main?.elements[0]?.assets[0]?.file,
          art.blocks.body[0]?.elements[0]?.assets[0]?.file,
          placeholderImg,
        ].find((element) => element),
        preview: art.fields.trailText,
        url: art.webUrl,
      };
    });

    state.posts = results;
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

export const updateSort = (sortOption) => {
  console.log("model being updated with new sort option");
  state.sort = sortOption;
};
