// import node modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

// import actions
import { fetchTraffic } from "../../actions/traffic";

// import components
import TrafficItem from "./TrafficItem"

// import common css
import "./styles.css";

class Traffic extends Component {
    // constructor(props) {
    //     super(props);
    // }

    // for testing on geolocation error
    // # FIX ME
    // componentDidMount = () => {
    //     this.props.fetchTrafficList(33.433638, -112.008113);
    // }

    componentWillReceiveProps = (nextProps) => {
        let lat = nextProps.position.latitude;
        let lng = nextProps.position.longitude;

        if (lat !== this.props.position.latitude && lng !== this.props.position.longitude) {
            this.props.fetchTrafficList(lat, lng);
        }
    }

    render() {
        // console.log("Traffic this.props:", this.props);
        // if(this.props.positionErrorMessage) {
        //     return (
        //         <div className="statusContainer">
        //             <p>{ this.props.positionErrorMessage }</p>
        //         </div>
        //     )
        // }

        if (this.props.trafficList === 0 || this.props.isFetching) {
            return (
                <div className="status-container">
                    <div className="spinner" />
                </div>
            )
        }

        return (
            <div>
                {
                    this.props.trafficList.map((item) => (
                        <TrafficItem key={item.Id} item={item}/>
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    positionErrorMessage: state.position.message,
    position: state.position.coords,
    trafficList: state.traffic.trafficList
});
  
const mapDispatchToProps = dispatch => ({
    fetchTrafficList: bindActionCreators(fetchTraffic, dispatch)
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Traffic);