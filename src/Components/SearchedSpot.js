import React, {Component} from "react";

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
      </div>
    )
  }
}

export default SearchedSpot;
