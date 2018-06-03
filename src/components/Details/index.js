// import node modules
import React, {Component} from 'react';

// import css
import "./styles.css";

class Details extends Component {
    constructor(props) {
      super(props);

      this.state = {
          logo: null
      };
    }

    getLogo = async (item) => {
        let name = item.Op;
        try {
            // name to domain api
            let res = await fetch(`https://company.clearbit.com/v1/domains/find?name=${name}`, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer sk_e843b5fe30d66d072302a61123b34d16`
                }
            });
            let data = await res.json();
            console.log("getLogo data: ", data);
            let logo = data.logo;
            // console.log("logo", logo);
            this.setState({
                logo: logo
            });
        } catch (error) {
            console.log("getLogo error: ", error);
        }
    }

    componentDidMount = () => {
        let item = this.props.location.state.item;
        this.getLogo(item);
    }

    render() {
        // console.log("Details this.props", this.props);
        let item = this.props.location.state.item;
        // console.log("Details item", item);
        return (
            <div className="details-container">
                <div className="company-details">
                    {
                        this.state.logo !== null && this.state.logo !== undefined
                            ? <img className="logo" src={this.state.logo} alt={"Op" in item ? item.Op : "Unknown company."} />
                            : <img className="logo" src="http://via.placeholder.com/128x128" alt={"Op" in item ? item.Op : "Unknown company."} />
                    }
                    {
                        "Op" in item && <p className="company-name"> { (item.Op).toUpperCase() }</p>
                    }
                </div>
                {
                    "Man" in item && <p><strong>Airplane Manufacturer: </strong>{ (item.Man).toUpperCase() }</p>
                }
                {
                    "Type" in item && <p><strong>Model: </strong>{ (item.Type).toUpperCase() }</p>
                }
                {
                    "From" in item && <p><strong>Origin airport: </strong>{ (item.From).toUpperCase() }</p>
                }
                {
                    "To" in item && <p><strong>Destination airport: </strong>{ (item.To).toUpperCase() }</p>
                }
            </div>
        )
    }
}

export default Details;