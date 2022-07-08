import { useState, useEffect } from "react";
// import { GlobalStyle } from "../../Styles";
import { catchErrors } from "../../Utils/Utils";
import { getTopArtist } from "../Spotify";
import { SectionWrapper, ArtistGrid } from "../../components";
import TimeRangeButton from "./PageComponents/TimeRangeButton";

function Artist() {
  const [topArtist, setTopArtist] = useState(null);
  const [activeRange, setActiveRange] = useState("short");

  useEffect(() => {
    const fetchData = async () => {
      const userTopArtist = await getTopArtist(`${activeRange}_term`);
      setTopArtist(userTopArtist.data);
    };

    catchErrors(fetchData());
  }, [activeRange]);

  return (
    <main>
      {topArtist && (
        <SectionWrapper title="Top artists" breadcrumb="true">
          <TimeRangeButton
            activeRange={activeRange}
            setActiveRange={setActiveRange}
          />
          <ArtistGrid artists={topArtist.items.slice(0, 10)} />
        </SectionWrapper>
      )}
    </main>
  );
}

export default Artist;
