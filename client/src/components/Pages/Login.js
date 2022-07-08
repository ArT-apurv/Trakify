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
  background-color: #1ed760;
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 600;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);
  top: 62vh;
  left: 10vh;
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
  left: 10vh;
  top: 25vh;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 800;
  font-size: 60px;
  line-height: 77px;

  color: #ffffff;
`;

function Login() {
  const myStyle = {
    position: "absolute",
    left: "8.4%",
    right: "84%",
    top: "7.03%",
    bottom: "90.04%",
  };

  const homeStyle = {
    position: "absolute",
    top: "6.5%",
    left: "85%",
    width: "30px",
    height: "30px",
  };

  const imageStyle = {
    position: "absolute",
    width: "540px",
    height: "540px",
    right: "10vh",
    top: "15vh",
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
        <StyledloginButton href="http://localhost:5000/login">
          LOGIN TO SPOTIFY
        </StyledloginButton>
      </StyledLoginContainer>
    </>
  );
}

export default Login;
