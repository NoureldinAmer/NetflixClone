import React, { createContext, useEffect, useReducer, useState } from "react";
import { apiReducer } from "../reducers/apiReducer";
import axios from "axios";
import { API_URL } from "@env";

export const ApiContext = createContext();

// Define your API endpoints here
const API_ENDPOINTS = [
  `${API_URL}/search/top-searches`,
  `${API_URL}/discover`,
  `${API_URL}/home-screen`,
];

const initialState = {
  loading: false,
  data: {},
  error: null,
};

export const ApiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(apiReducer, initialState);

  const fetchData = async (endpoint) => {
    try {
      const response = await axios.get(endpoint);
      return { endpoint: response.data.endpoint, data: response.data };
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    dispatch({ type: "FETCH_DATA_BEGIN" });

    const fetchAllData = async () => {
      try {
        const results = await Promise.all(API_ENDPOINTS.map(fetchData));
        results.forEach(({ endpoint, data }) => {
          dispatch({
            type: "FETCH_DATA_SUCCESS",
            payload: { endpoint, data },
          });
        });
      } catch (error) {
        dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
      } finally {
        dispatch({ type: "END_FETCH_DATA" });
      }
    };

    fetchAllData();
  }, []);

  return (
    <ApiContext.Provider value={{ ...state }}>{children}</ApiContext.Provider>
  );
};
