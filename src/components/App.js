import axios from "axios";
import { Component } from "react";
import "./App.css";

import ArticleList from "./ArticleList";
import fetchArticlesWithQuery from "../services/api";

import { FcLike } from "react-icons/fc";

axios.defaults.baseURL = "https://hn.algolia.com/api/v1";

export default class App extends Component {
  state = {
    articles: [],
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const articles = await fetchArticlesWithQuery("react");
      this.setState({ articles });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { articles, isLoading, error } = this.state;

    return (
      <div>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && (
          <p>
            Loading...
            <FcLike />
          </p>
        )}
        {articles.length > 0 && <ArticleList articles={articles} />}
      </div>
    );
  }
}
