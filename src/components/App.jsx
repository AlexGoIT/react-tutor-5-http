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
    page: 1,
    totalPages: 1,
    searchQuery: "",
    isMore: false,
    isLoading: false,
    error: null,
  };

  // componentDidMount() {
  //   this.fetchImages();
  // }

  componentDidUpdate(prevProps, prevState) {
    // console.log("componentDidUpdate", prevState);

    if (
      this.state.searchQuery !== prevState.searchQuery ||
      this.state.page !== prevState.page
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    this.setState({ isLoading: true });
    try {
      const images = await this.imageAPI.fetchImages(
        this.state.searchQuery,
        this.state.page
      );

      const { hits, total, totalHits } = images;
      const totalPages = Math.ceil(totalHits / 12);

      if (totalPages > 1) {
        this.setState({ isMore: true });
      }

      this.setState({ hits, total, totalHits, totalPages });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = () => {
    this.setState((prevState) => {
      if (prevState.page < this.state.totalPages) {
        return { page: prevState.page + 1 };
      } else {
        console.log("Not images");
      }
    });

    if (this.state.page >= this.state.totalPages) {
      this.setState({ isMore: false });
    }
  };

  handleSearchQuery = (value) => {
    this.setState({ searchQuery: value, page: 1 });
  };

  render() {
    const { hits, isLoading, error, isMore } = this.state;

    return (
      <>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        <Searchbar onSearchQuery={this.handleSearchQuery} />
        {hits.length > 0 && <ImageGallery hits={hits} />}
        {isMore && <Button onLoadMore={this.handleLoadMore} />}
        {isLoading && <Loader />}
      </>
    );
  }
}
