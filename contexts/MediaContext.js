import React, { createContext, useState } from "react";

export const MediaContext = createContext({
  selectedMedia: {
    contentID: null,
    contentType: null,
  },
  episodeDetails: {
    seasonNumber: null,
    episodeNumber: null,
  },
  setSelectedMediaID: (mediaID) => {},
  setEpisode: (seasonNumber, episodeNumber) => {},
});

const MediaContextProvider = ({ children }) => {
  const [selectedMedia, setSelectedMedia] = useState({
    contentID: null,
    contentType: null,
  });

  const [episodeDetails, setEpisodeDetails] = useState({
    seasonNumber: null,
    episodeNumber: null,
  });

  function setEpisode(seasonNumber, episodeNumber) {
    setEpisodeDetails({
      seasonNumber: seasonNumber,
      episodeNumber: episodeNumber,
    });
    console.log(episodeDetails);
  }

  function setSelectedMediaID(mediaID) {
    setSelectedMedia(mediaID);
  }

  return (
    <MediaContext.Provider
      value={{
        selectedMedia,
        setSelectedMediaID,
        setEpisode,
        episodeDetails,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export default MediaContextProvider;
