import { useState, useEffect } from "react";
import { getTopTracks } from "./../Spotify";
import { catchErrors } from "./../../Utils/Utils";
import { SectionWrapper, TrackList } from "./../../components";
import TimeRangeButton from "./PageComponents/TimeRangeButton";

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState(null);
  const [activeRange, setActiveRange] = useState("short");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTopTracks(`${activeRange}_term`);
      setTopTracks(data);
    };

    catchErrors(fetchData());
  }, [activeRange]);

  return (
    <main>
      <SectionWrapper title="Top Tracks" breadcrumb={true}>
        <TimeRangeButton
          activeRange={activeRange}
          setActiveRange={setActiveRange}
        />

        {topTracks && topTracks.items && <TrackList tracks={topTracks.items} />}
      </SectionWrapper>
    </main>
  );
};

export default TopTracks;
