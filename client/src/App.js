import { useEffect, useState } from "react";
import { getToken, getCurrentUserProfile } from "./components/Spotify";
import { catchErrors } from "./Utils/Utils";
import { Route, Routes, useLocation } from "react-router-dom";
import { GlobalStyle } from "./Styles";
import {
  Login,
  Profile,
  Artist,
  Playlists,
  Tracks,
  Playlist,
} from "./components/Pages";
import { logout } from "./components/Spotify";
import styled from "styled-components";

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 760px) {
    right: var(--spacing-lg);
  }
`;

function App() {
  const [token, setToken] = useState(null);
  const [, setProfile] = useState(null);
  useEffect(() => {
    setToken(getToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };

    catchErrors(fetchData());
  }, []);

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        {!token ? (
          <Login />
        ) : (
          <>
            <StyledLogoutButton onClick={logout}>LogOut</StyledLogoutButton>
            <ScrollToTop />
            <Routes>
              <Route path="/top-artists" element={<Artist />}></Route>
              <Route path="/top-tracks" element={<Tracks />}></Route>
              <Route path="playlists/:id" element={<Playlist />}></Route>
              <Route path="/playlists" element={<Playlists />}></Route>
              <Route path="/" element={<Profile />}></Route>
            </Routes>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
