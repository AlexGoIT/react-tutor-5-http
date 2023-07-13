import { Component } from "react";
import "./App.css";

// import ArticleList from "./ArticleList";
import ImageList from "./ImageList";
import ImageAPI from "../services/api";

export default class App extends Component {
  imageAPI = new ImageAPI();

  state = {
    hits: [],
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const images = await this.imageAPI.fetchImages();
      this.setState({ hits: images.hits });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { hits, isLoading, error } = this.state;

    return (
      <div>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <p>Loading...</p>}
        {hits.length > 0 && <ImageList hits={hits} />}
      </div>
    );
  }
}
