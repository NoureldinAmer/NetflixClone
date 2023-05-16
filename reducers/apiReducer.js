export const apiReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA_BEGIN":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.endpoint]: action.payload.data,
        },
      };
    case "FETCH_DATA_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "END_FETCH_DATA":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
