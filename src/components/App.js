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
    searchQuery: "",
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const images = await this.imageAPI.fetchImages();

      const { hits, total, totalHits } = images;

      console.log(images);

      this.setState({ hits, total, totalHits });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async componentDidUpdate(nextState) {
    console.log(this.state.searchQuery, nextState.searchQuery);

    // if (this.state.searchQuery === "") {
    //   return;
    // }

    // console.log(this.state.searchQuery);

    // this.setState({ isLoading: true });

    //   try {
    //     const images = await this.imageAPI.fetchImages(this.state.searchQuery);
    //     this.setState({ hits: images.hits });
    //   } catch (error) {
    //     this.setState({ error });
    //   } finally {
    //     this.setState({ isLoading: false });
    //   }
    // }

    // handleSubmit = (searchQuery) => {
    //   this.setState({
    //     searchQuery,
    //   });
  }

  render() {
    const { hits, isLoading, error } = this.state;

    return (
      <>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        <Searchbar
          onSubmit={(searchQuery) => {
            if (this.state.searchQuery !== searchQuery) {
              this.setState({
                searchQuery,
              });
            }
          }}
        />
        {hits.length > 0 && <ImageGallery hits={hits} />}
        <Button />
        {isLoading && <Loader />}
      </>
    );
  }
}
