// import node modules
import React from 'react';
import { Link } from "react-router-dom";

// import assets
import plane from '../../plane2.png';

// import common css
import "./styles.css";

const TrafficItem = ({ item }) => {
  const orientation = item.Trak > 180 ? "west" : "east";

  const callInItem = "Call" in item;
  const code = callInItem ? "code" : "no-code";

  const altInItem = "Alt" in item;

  return (
    <Link
        to={{
            pathname: `/flight-details/${item.Id}`,
            state: { item: item }
        }}
    >
        <div className="traffic-item">
            <div className="icon-wrapper">
                <img alt="plane-icon" className={`icon ${orientation}`} src={plane} />
            </div>
            <div>
                <p>
                    <strong>Flight code number </strong>
                    <span className={`badge ${code}`}>{`${callInItem ? item.Call : "unknown"}`}</span>
                </p>
                <p>
                    <strong>Altitude </strong>
                    <span className="badge altitude-badge"> {`${altInItem ? item.Alt : "unknown"}`}</span>
                </p>
            </div>
        </div>
    </Link>
  )
};

export default TrafficItem;