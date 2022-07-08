import styled from "styled-components";
import SpotifyIcon from "../Resources/SpotifySVG";
import HomeIcon from "../Resources/HomeSVG";
import image from "./../Resources/Untitled-removebg.png";

const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledloginButton = styled.a`
  position: absolute;
  background-color: #2942c2;
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 600;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);
  bottom: 24vh;
  left: 15vh;
  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`;

const StyledParagraph = styled.p`
  position: absolute;
  width: 527px;
  height: 258px;
  left: 15vh;
  top: 20vh;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 60px;
  line-height: 77px;

  color: #ffffff;
`;

function Login() {
  const myStyle = {
    position: "absolute",
    left: "15vh",
    top: "7vh",
  };

  const homeStyle = {
    position: "absolute",
    top: "6.5vh",
    right: "20vh",
    width: "30px",
    height: "30px",
  };

  const imageStyle = {
    position: "absolute",
    width: "540px",
    height: "540px",
    right: "20vh",
    top: "17.5vh",
  };

  const textStyle = {
    position: "absolute",
    width: "400px",
    height: "112px",
    left: "15vh",
    bottom: "30vh",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "22px",
    lineHeight: "27px",
    display: "flex",
    alignItems: "center,",
  };

  return (
    <>
      <StyledLoginContainer>
        <SpotifyIcon style={myStyle} />
        <HomeIcon style={homeStyle} />
        <img src={image} style={imageStyle} alt="Headphones"></img>
        <StyledParagraph>
          Music you love, right at your fingertips.
        </StyledParagraph>
        <p style={textStyle}>
          Discover your favorite songs and track your playlists from your
          personal spotify account.
        </p>
        <StyledloginButton href="http://localhost:5000/login">
          LOGIN TO SPOTIFY
        </StyledloginButton>
      </StyledLoginContainer>
    </>
  );
}

export default Login;
