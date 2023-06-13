import React, { createContext, useRef, useState } from "react";
import { updateProgress } from "../util/database";

export const MediaContext = createContext({
  selectedMedia: {
    contentID: null,
    contentType: null,
    poster_path: null,
    title: null,
  },
  episodeDetails: {
    seasonNumber: null,
    episodeNumber: null,
    runtime: null,
  },
  setSelectedMediaID: (mediaID) => {},
  startTimer: () => {},
  stopTimer: () => {},
  setEpisode: (seasonNumber, episodeNumber) => {},
  setSelectedMediaRuntime: (runtime) => {},
});

const MediaContextProvider = ({ children }) => {
  const startTimestampRef = useRef(null);
  const [mediaRuntime, setMediaRuntime] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState({
    contentID: null,
    contentType: null,
    poster_path: null,
    title: null,
  });

  const [episodeDetails, setEpisodeDetails] = useState({
    seasonNumber: 1,
    episodeNumber: 1,
  });

  const startTimer = () => {
    console.log("startedTimer", selectedMedia.contentID);
    startTimestampRef.current = Date.now();
  };

  const stopTimer = () => {
    if (startTimestampRef.current) {
      console.log(startTimestampRef.current);
      const endTimestamp = Date.now();
      const elapsedMinutes = (endTimestamp - startTimestampRef.current) / 60000;
      const progress = (elapsedMinutes / mediaRuntime) * 100;
      const roundedProgress = Math.ceil(progress / 5) * 5;
      console.log(
        `Elapsed time: ${Math.ceil(elapsedMinutes)} m for ${
          selectedMedia.contentID
        }`
      );
      console.log(`you watched ${Math.ceil(roundedProgress)} % of the movie`);
      startTimestampRef.current = null;
      const results = updateProgress(
        selectedMedia,
        roundedProgress,
        episodeDetails
      );
      console.log(results);
    }
  };

  function setEpisode(seasonNumber, episodeNumber) {
    setEpisodeDetails({
      seasonNumber: seasonNumber,
      episodeNumber: episodeNumber,
    });
    //(episodeDetails);
  }

  function setSelectedMediaID(mediaID) {
    setSelectedMedia(mediaID);
  }

  function setSelectedMediaRuntime(runtime) {
    console.log("new runtime", runtime);
    setMediaRuntime(runtime ? runtime : 60);
  }

  return (
    <MediaContext.Provider
      value={{
        selectedMedia,
        setSelectedMediaID,
        setEpisode,
        episodeDetails,
        startTimer,
        stopTimer,
        setSelectedMediaRuntime,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export default MediaContextProvider;
