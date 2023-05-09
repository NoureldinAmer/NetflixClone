import React, { createContext, useState } from "react";

export const MediaContext = createContext({
  selectedMediaID: 0,
  setSelectedMediaID: (mediaID) => {},
});

const MediaContextProvider = ({ children }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);

  function setSelectedMediaID(mediaID) {
    setSelectedMedia(mediaID);
  }

  return (
    <MediaContext.Provider
      value={{
        selectedMediaID: selectedMedia,
        setSelectedMediaID,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export default MediaContextProvider;
