// const TRAFFIC_URL = `https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${lat}&lng=${lng}&fDstL=0&fDstU=100`;
const TRAFFIC_URL = "http://localhost:3000/AircraftList.json";

export const fetchTrafficStart = () => ({
    type: "FETCH_TRAFFIC_START"
});
  
export const fetchTrafficSuccess = (trafficList) => ({
    type: "FETCH_TRAFFIC_SUCCESS",
    trafficList: trafficList
});
  
export const fetchTrafficError = (error) => ({
    type: "FETCH_TRAFFIC_ERROR",
    message: error
});

export const fetchTraffic = ({ lat, long }) => (dispatch, getState) => {

    if(getState().traffic.isFetching) return false;

    dispatch(fetchTrafficStart());

    return fetch(TRAFFIC_URL)
        .then(res => res.json())
        .then(json => {
            if("acList" in json) {
                let list = json.acList;

                let sortedList = list.sort((a, b) => {
                    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
                    if (a.Alt > b.Alt) {
                        return -1;
                    }
                    if (a.Alt < b.Alt) {
                        return 1;
                    }
                    // a must be equal to b
                    return 0;
                });

                dispatch(fetchTrafficSuccess(sortedList));

                // const withIconsPromises = sortedFlights.map((flight) => {
                //     return fetchDomain(flight.Man).then((logo) => {
                //         return {
                //         ...flight,
                //         manIcon: logo
                //         }
                //     });
                // });

                // Promise.all(withIconsPromises).then((newArray) => {
                //     dispatch(fetchTrafficSuccess(newArray))
                // });

            } else {
                dispatch(fetchTrafficError("Wrong data format fetched."));
            }
        })
        .catch(error => dispatch(fetchTrafficError(error.message)));
};