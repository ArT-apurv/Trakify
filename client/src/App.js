import "./App.css";
import { useEffect, useState } from "react";
import { getToken, getCurrentUserProfile } from "./components/Spotify";
import { catchErrors } from "./Utils/Utils";
import { Route, Routes, useLocation } from "react-router-dom";
import Artist from "./components/Pages/Artist";
import Tracks from "./components/Pages/Tracks";
import Playlists from "./components/Pages/Playlists";
import Playlist from "./components/Pages/Playlist";
import Homepage from "./components/Pages/Homepage";
import styled from "styled-components/macro";
import GlobalStyle from "./Styles";

const StyledLoginButton = styled.a`
  background-color: green;
  color: white;
  padding: 10px 20px;
  margin: 20px auto;
  border-radius: 30px;
  display: inline-block;
`;

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    setToken(getToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);

      console.log(data);
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
          <StyledLoginButton
            className="App-link"
            href="http://localhost:5000/login"
          >
            Login to Spotify
          </StyledLoginButton>
        ) : (
          <>
            <ScrollToTop />
            <Routes>
              <Route path="/top-artist" element={<Artist />}></Route>
              <Route path="/top-tracks" element={<Tracks />}></Route>
              <Route path="playlists/:id" element={<Playlist />}></Route>
              <Route path="/playlists" element={<Playlists />}></Route>
              <Route path="/" element={<Homepage profile={profile} />}></Route>
            </Routes>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
