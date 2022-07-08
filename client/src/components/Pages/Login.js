import styled from "styled-components";
import SpotifyIcon from "../SVG/SpotifySVG";

const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledloginButton = styled.a`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`;

function Login() {
  const myStyle = {
    position: "absolute",
    left: "84.72%",
    right: "8.4%",
    top: "7.03%",
    bottom: "90.04%",
  };

  return (
    <>
      <SpotifyIcon style={myStyle} />
      <StyledLoginContainer>
        <StyledloginButton href="http://localhost:5000/login">
          Login to Spotify
        </StyledloginButton>
      </StyledLoginContainer>
    </>
  );
}

export default Login;
