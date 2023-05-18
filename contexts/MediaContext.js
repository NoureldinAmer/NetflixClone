import React, { createContext, useState } from "react";

export const MediaContext = createContext({
  selectedMedia: {
    contentID: null,
    contentType: null,
  },
  setSelectedMediaID: (mediaID) => {},
});

const MediaContextProvider = ({ children }) => {
  const [selectedMedia, setSelectedMedia] = useState({
    contentID: null,
    contentType: null,
  });

  function setSelectedMediaID(mediaID) {
    setSelectedMedia(mediaID);
  }

  return (
    <MediaContext.Provider
      value={{
        selectedMedia,
        setSelectedMediaID,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export default MediaContextProvider;
