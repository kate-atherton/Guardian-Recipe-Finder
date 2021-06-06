import { getData } from "./helpers.js";
import { API_URL, KEY, RES_PER_PAGE } from "./config.js";

export const state = {
  posts: {},
  page: 1,
  resultsPerPage: RES_PER_PAGE,
  searched: "default",
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
    state.searched = state.searched.split(" ").join("%20");
  }

  try {
    const params = new URLSearchParams();

    params.set("page", state.page);
    params.set("page-size", RES_PER_PAGE);
    params.set("tag", "tone/recipes");
    params.set("q", state.searched === "default" ? "" : state.searched);
    params.set("api-key", KEY);
    params.set(
      "order-by",
      state.searched === "default" ? "newest" : state.sort
    );
    params.set("show-fields", "all");
    params.set("show-tags", "all");
    params.set("show-blocks", "all");
    params.set("show-elements", "all");

    const data = await getData(API_URL + params.toString());

    state.totalPages = data.response.pages;
    state.totalPosts = data.response.total;
    state.page = data.response.currentPage;

    const placeholderImg = "static/img/placeholder.jpg";

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
      art.preview = art.preview.replace(/(<p>|<\/p>)/g, "");
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

const persistBookmarks = () => {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = (article) => {
  state.bookmarks.push(article);
  persistBookmarks();
};

export const deleteBookmark = (article) => {
  state.bookmarks = state.bookmarks.filter((item) => item !== article);
  persistBookmarks();
};

const init = () => {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
