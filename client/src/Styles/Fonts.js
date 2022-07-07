import { css } from "styled-components/macro";

const Fonts = css`
  @font-face {
    font-family: "Circular Std";
    src: url("../Fonts/CircularStd-Black.woff2") format("woff2"),
      url("../Fonts/CircularStd-Book.woff") format("woff");
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: "Circular Std";
    src: url("../Fonts/CircularStd-Bold.woff2") format("woff2"),
      url("../Fonts/CircularStd-Bold.woff") format("woff");
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: "Circular Std";
    src: url("../Fonts/CircularStd-Black.woff2") format("woff2"),
      url("../Fonts/CircularStd-Black.woff") format("woff");
    font-weight: 900;
    font-style: normal;
  }
`;

export default Fonts;
