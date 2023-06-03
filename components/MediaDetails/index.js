import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@env";
import MovieDetails from "./MovieDetails/MovieDetails";
import { MediaContext } from "../../contexts/MediaContext";

const MediaDetails = () => {
  const [mediaState, setMediaState] = useState({
    loading: true,
    error: null,
    data: {},
  });
  const { selectedMedia } = useContext(MediaContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${API_URL}/details/${selectedMedia.contentType}/${selectedMedia.contentID}`
        );
        setMediaState({
          loading: false,
          error: false,
          data: response.data.results,
        });
      } catch (error) {
        setMediaState({
          loading: false,
          error: true,
        });
      }
    }

    fetchData();
  }, []);

  return selectedMedia.contentType === "movie" ? (
    <MovieDetails {...mediaState} />
  ) : (
    <ShowDetails {...mediaState} />
  );
};

export default MediaDetails;
