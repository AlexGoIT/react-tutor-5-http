import { Component } from "react";
import "./App.css";

import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import Loader from "./Loader";

import ImageAPI from "../services/api";

export default class App extends Component {
  imageAPI = new ImageAPI();

  state = {
    hits: [],
    total: 0,
    totalHits: 0,
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.fetchImages();
  }

  fetchImages = async (searchQuery) => {
    this.setState({ isLoading: true });
    try {
      const images = await this.imageAPI.fetchImages(searchQuery);
      const { hits, total, totalHits } = images;

      this.setState({ hits, total, totalHits });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { hits, isLoading, error } = this.state;

    return (
      <>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        <Searchbar onSubmit={this.fetchImages} />
        {hits.length > 0 && <ImageGallery hits={hits} />}
        <Button />
        {isLoading && <Loader />}
      </>
    );
  }
}
