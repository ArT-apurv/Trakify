import { useState, useEffect } from "react";
import { catchErrors } from "./../../Utils/Utils";
import {
  getCurrentUserProfile,
  getCurrentUserPlaylist,
  getTopArtist,
  getTopTracks,
} from "../Spotify";
// import StyledHeader from "./../../Styles/StyledHeader";
import { StyledHeader } from "./../../Styles";
import {
  SectionWrapper,
  ArtistGrid,
  TrackList,
  PlaylistsGrid,
  Loader,
} from "./../../components";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [topArtist, setTopArtist] = useState(null);
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile.data);

      const userPlaylist = await getCurrentUserPlaylist();
      setPlaylist(userPlaylist.data);

      const userTopArtist = await getTopArtist();
      setTopArtist(userTopArtist.data);

      const userTopTracks = await getTopTracks();
      setTopTracks(userTopTracks.data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <>
      {profile && (
        <StyledHeader type="user">
          <div className="header__inner">
            {profile.images.length && profile.images[0].url && (
              <img
                className="header__img"
                src={profile.images[0].url}
                alt="Avatar"
              />
            )}
            <div>
              <div className="header__overline">Profile</div>
              <h1 className="header__name">{profile.display_name}</h1>
              <p className="header__meta">
                {playlist && (
                  <span>
                    {playlist.total} Playlist{playlist.total !== 1 ? "s" : ""}
                  </span>
                )}
                <span>
                  {profile.followers.total} Follower
                  {profile.followers.total !== 1 ? "s" : ""}
                </span>
              </p>
            </div>
          </div>
        </StyledHeader>
      )}

      {topArtist && topTracks && playlist ? (
        <main>
          <SectionWrapper title="Top artists" seeAllLink="/top-artists">
            <ArtistGrid artists={topArtist.items.slice(0, 10)} />
          </SectionWrapper>

          <SectionWrapper title="Top tracks" seeAllLink="/top-tracks">
            <TrackList tracks={topTracks.items.slice(0, 10)} />
          </SectionWrapper>

          <SectionWrapper title="Playlists" seeAllLink="/playlists">
            <PlaylistsGrid playlists={playlist.items.slice(0, 10)} />
          </SectionWrapper>
        </main>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Profile;
