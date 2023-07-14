import { Overlay, ModalWrapper } from "./Modal.styled";

const Modal = ({ tags, largeImageURL }) => {
  return (
    <Overlay>
      <ModalWrapper>
        <img src={largeImageURL} alt={tags} />
      </ModalWrapper>
    </Overlay>
  );
};

export default Modal;
