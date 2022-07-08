import { useState, useEffect } from "react";
import { catchErrors } from "./../../Utils/Utils";
import { getCurrentUserPlaylist } from "../Spotify";
import { SectionWrapper, PlaylistsGrid } from "./../../components";
import axios from "axios";

const Profile = () => {
  const [playlistsData, setPlaylistsData] = useState(null);
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserPlaylist();
      setPlaylistsData(data);
    };

    catchErrors(fetchData());
  }, []);

  useEffect(() => {
    if (!playlistsData) {
      return;
    }

    console.log(playlistsData.next);
    const fetchMoreData = async () => {
      if (playlistsData.next) {
        const { data } = await axios.get(playlistsData.next);
        setPlaylistsData(data);
      }
    };

    setPlaylist((playlist) => [
      ...(playlist ? playlist : []),
      ...playlistsData.items,
    ]);

    catchErrors(fetchMoreData());
  }, [playlistsData]);

  return (
    <>
      <main>
        <SectionWrapper title="Public Playlists" breadcrumb="true">
          {playlist && <PlaylistsGrid playlists={playlist} />}
        </SectionWrapper>
      </main>
    </>
  );
};

export default Profile;
