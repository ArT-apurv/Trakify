import styled from "styled-components";

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
  return (
    <StyledLoginContainer>
      <StyledloginButton href="http://localhost:5000/login">
        Login to Spotify
      </StyledloginButton>
    </StyledLoginContainer>
  );
}

export default Login;
