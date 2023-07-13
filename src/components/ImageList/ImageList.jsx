import { ImageContainer, ImageItem } from "./ImageList.styled";
import PropTypes from "prop-types";

const ImageList = ({ hits }) => {
  return (
    <ImageContainer>
      {hits.map(({ id, webformatURL, tags, largeImageURL, previewURL }) => (
        <ImageItem key={id}>
          <a
            href={largeImageURL}
            onClick={(e) => {
              e.preventDefault();
              handleClick(e);
            }}
          >
            <img src={webformatURL} alt={tags} loading="lazy" />
          </a>
        </ImageItem>
      ))}
    </ImageContainer>
  );
};

export default ImageList;

const handleClick = (e) => {
  console.log(e.target.src);
};

ImageList.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      previewURL: PropTypes.string.isRequired,
    })
  ),
};
