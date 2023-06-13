import { View, Text } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_URL } from "@env";
import MovieDetails from "./MovieDetails/MovieDetails";
import { MediaContext } from "../../contexts/MediaContext";
import ShowDetails from "./ShowDetails.js/ShowDetails";

const MediaDetails = () => {
  const [mediaState, setMediaState] = useState({
    loading: true,
    error: null,
    data: {},
  });
  const { selectedMedia, setEpisode, setSelectedMediaRuntime } =
    useContext(MediaContext);
  const startTimestampRef = useRef(null);
  const endTimestampRef = useRef(null);

  //record how long a user spends on movie
  // const startTimer = () => {
  //   // Start the timer by recording the current timestamp
  //   console.log("starting timer");
  //   startTimestampRef.current = Date.now();
  // };

  useEffect(() => {
    async function fetchData() {
      try {
        console.log(
          `${API_URL}/details/${selectedMedia.contentType}/${selectedMedia.contentID}`
        );
        const response = await axios.get(
          `${API_URL}/details/${selectedMedia.contentType}/${selectedMedia.contentID}`
        );
        setMediaState({
          loading: false,
          error: false,
          data: response.data.results,
          //data,
        });
        setSelectedMediaRuntime(response.data.results.mediaDetails.duration);
      } catch (error) {
        setMediaState({
          loading: false,
          error: true,
        });
      }
    }

    fetchData();
    setEpisode(1, 1); //reset episode and season number
    console.log(" i am him");

    return () => {
      console.log("i am not him");
      if (startTimestampRef.current) {
        const endTimestamp = Date.now();
        const elapsedMilliseconds = endTimestamp - startTimestampRef.current;
        console.log(`Elapsed time: ${elapsedMilliseconds} milliseconds`);
      }
    };
  }, []);

  return selectedMedia.contentType === "movie" ? (
    <MovieDetails {...mediaState} />
  ) : (
    <ShowDetails {...mediaState} />
  );
};

export default MediaDetails;
