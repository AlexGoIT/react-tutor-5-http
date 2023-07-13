import styled from "styled-components";

export const ImageContainer = styled.ul`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`;

export const ImageItem = styled.li`
  width: calc(100% / 4 - 10px);
  height: 200px;
  margin: 5px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:is(:hover, :focus) {
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18),
      0 4px 15px 0 rgba(0, 0, 0, 0.15);
    transform: scale(1.02);
  }

  img {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      0deg,
      rgba(255, 239, 0, 1) 0%,
      rgba(0, 82, 255, 1) 100%
    );
  }
`;
