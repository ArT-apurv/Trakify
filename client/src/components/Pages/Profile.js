import { useState, useEffect } from "react";
import { catchErrors } from "./../../Utils/Utils";
import {
  getCurrentUserProfile,
  getCurrentUserPlaylist,
  getTopArtist,
} from "../Spotify";
import StyledHeader from "./../../Styles/StyledHeader";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [topArtist, setTopArtist] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile.data);

      const userPlaylist = await getCurrentUserPlaylist();
      setPlaylist(userPlaylist.data);

      const userTopArtist = await getTopArtist();
      setTopArtist(userTopArtist.data);

      console.log(userTopArtist.data);
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
    </>
  );
};

export default Profile;