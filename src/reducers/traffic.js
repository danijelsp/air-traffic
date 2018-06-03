const initialState = {
    errorMessage: null,
    isFetching: false,
    trafficList: []
};
  
export default (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_TRAFFIC_START':
            return {
                ...state,
                isFetching: true,
                errorMessage: null
            };
        case 'FETCH_TRAFFIC_SUCCESS':
            return {
                ...state,
                isFetching: false,
                trafficList: action.trafficList
            };
        case 'FETCH_TRAFFIC_ERROR':
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            };
        default:
            return state
    }
};