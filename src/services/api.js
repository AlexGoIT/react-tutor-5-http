import axios from "axios";

// axios.defaults.baseURL = "https://hn.algolia.com/api/v1";

// const fetchArticlesWithQuery = async (searchQuery) => {
//   const response = await axios.get(`/search?query=${searchQuery}`);
//   return response.data.hits;
// };

// export default fetchArticlesWithQuery;

export default class ImageAPI {
  #KEY = "35497294-a51068c2cf702ee7b95a718bd";
  #BASE_URL = "https://pixabay.com/api/";

  #axiosInstance = axios.create({
    baseURL: this.#BASE_URL,
  });

  fetchImages = async (searchQuery) => {
    const params = {
      params: {
        q: searchQuery ? searchQuery : "",
        key: this.#KEY,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: false,
        per_page: 12,
        page: 1,
        timeout: 1000,
      },
    };

    const response = await this.#axiosInstance.get("", params);
    return response.data;
  };
}
