// import node modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";

// import actions
import { setCoordinatesSuccess, setCoordinatesError } from "../../actions/position";

// import components
import Traffic from "../Traffic";
import Details from "../Details";

class Container extends Component {

    getPositionSuccess = (position) => {
        // https://www.w3schools.com/Html/html5_geolocation.asp
        // console.log("getPositionSuccess position: ", position);
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        this.props.actions.setCoordinatesSuccess(lat, lng);
        // this.getTraffic(lat, lng);
    }
    
    getPositionError = (error) => {
        // https://www.w3schools.com/Html/html5_geolocation.asp
        // console.log("getPositionError error: ", error);

        let message = "";

        switch(error.code) {
          case error.PERMISSION_DENIED:
            message = "User denied the request for Geolocation.";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            message = "The request to get user location timed out.";
            break;
          default:
            message = "An unknown error occurred.";
        }
    
        this.props.actions.setCoordinatesError(message);
    }

    componentDidMount = () => {
        // console.log("Container DidMount");
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(this.getPositionSuccess, this.getPositionError);
        } else {
            this.props.setCoordinatesFailAction("Geolocation is not supported by this browser.");
        }
    }

    render() {
        // console.log("Container this.props:", this.props);
        return (
            <Router>
                <div className="container">
                    <Route exact path="/" component={Traffic} />
                    <Route path="/flight-details/:Id" component={Details} />
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.position.message,
        coords: state.position.coords
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ setCoordinatesSuccess, setCoordinatesError }, dispatch)
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Container);