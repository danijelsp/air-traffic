import { combineReducers } from 'redux';

// import reducers
import position from "./position";
import traffic from "./traffic";

export default combineReducers({
    position,
    traffic
});