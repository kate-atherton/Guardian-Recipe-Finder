import { getData } from "./helpers.js";
import { API_URL, KEY, RES_PER_PAGE } from "./config.js";

export const state = {
  posts: {},
  page: 1,
  resultsPerPage: RES_PER_PAGE,
  searched: "",
  sort: "relevance",
  totalPages: 0,
  totalPosts: 0,
  activeTab: "articles",
  inactiveTab: "bookmarks",
  bookmarks: [],
};

export const checkValidQuery = (query) => {
  if (!/[^a-zA-Z\s]/.test(query)) {
    return true;
  }
};

export const loadResults = async () => {
  if (/\s/.test(state.seached)) {
    state.searched = state.searched.split(" ").join("%20AND%20");
  }

  try {
    const data = await getData(
      `${API_URL}page=${state.page}&page-size=${RES_PER_PAGE}&tag=tone%2Frecipes&q=${state.searched}&api-key=${KEY}&order-by=${state.sort}&show-fields=all&show-tags=all&show-blocks=all&show-elements=all`
    );

    state.totalPages = data.response.pages;
    state.totalPosts = data.response.total;
    state.page = data.response.currentPage;

    const placeholderImg = "img/Hangman12.png";

    const results = data.response.results.map((art) => {
      return {
        headline: art.webTitle,
        image: [
          art.fields.thumbnail,
          art.blocks.main?.elements[0]?.assets[0]?.file,
          art.blocks.body[0]?.elements[0]?.assets[0]?.file,
          placeholderImg,
        ].find(Boolean),
        preview: art.fields.trailText,
        url: art.webUrl,
        bookmarked: false,
        id: art.id,
      };
    });

    results.forEach((art) => {
      if (state.bookmarks.find((element) => element.id === art.id)) {
        art.bookmarked = true;
      }
    });

    state.posts = results;
  } catch (err) {
    console.error(err);
  }
};

export const updateSearch = (query) => {
  state.searched = query;
};

export const updatePage = (page) => {
  state.page = page;
};

export const updateSort = (sortOption) => {
  state.sort = sortOption;
};

export const updateTab = () => {
  [state.activeTab, state.inactiveTab] = [state.inactiveTab, state.activeTab];
};

export const addBookmark = (article) => {
  state.bookmarks.push(article);
};

export const deleteBookmark = (article) => {
  state.bookmarks = state.bookmarks.filter((item) => item !== article);
};
