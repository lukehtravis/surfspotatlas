import React, {Component} from "react";
import {Link} from "react-router-dom";

class SearchedSpot extends Component {
  constructor(props) {
    super(props);

  }

  render(){
    if (!this.props) {
      return "Loading";
    }

    return (
      <div>
        <span>{this.props.name}</span>
        <span>{this.props.direction}</span>
        <span>{this.props.bathymetry}</span>
        <span>{this.props.quality}</span>
        <span>{this.props.danger}</span>
        <span>{this.props.area}</span>
        <Link to={`Wave/${this.props.spotId}`}>{this.props.name}</Link>
      </div>
    )
  }
}

export default SearchedSpot;
