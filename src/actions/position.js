export const setCoordinatesSuccess = (latitude, longitude) => ({
    type: "SET_COORDINATES_SUCCESS",
    latitude,
    longitude
});
  
export const setCoordinatesError = (message) => ({
    type: "SET_COORDINATES_ERROR",
    message
});