import React, {Component} from "react";

class Canvas extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const points = this.convertNumericRange([this.props.windAngleOne,this.props.windAngleTwo])
    const canvas = this.refs.canvas
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(50, 50, 50, points[0] * Math.PI, points[1] * Math.PI);
    ctx.stroke();
  }

  convertNumericRange(arrayOfArcPoints) {
    // parts of solution from https://stackoverflow.com/questions/929103/convert-a-number-range-to-another-range-maintaining-ratio
    // Here we must convert 0 - 360 (compass degree scale) to a 0-2 (canvas radians)
    // number scale, as well as prepare our arc to appear on the proper radius
    let convertedPoints = []
    arrayOfArcPoints.map(point => {
      point = this.rotateArc(point);
      let convertedRadianPoint = this.convertCompassDegreesToRadians(point)
      convertedPoints.push(convertedRadianPoint);
    })
    return convertedPoints
  }

  rotateArc(point) {
    // Rotate arc starting and ending points by 90 degrees accross a 360 degree
    // circle, if the starting or ending points are less than 90 degrees
    // This is necessary as wind degrees are measured from zero at due north
    // (top of 2d circle plane), while the canvas element draws from the
    // right of the circle, which is due east on a compass
    if (point < 90) {
      var rotation = 90 - point;
      rotation = 360 - rotation;
      return point = rotation
    } else {
      return point = point - 90;
    }
  }

  convertCompassDegreesToRadians(rotatedDegreePoint) {
    const oldRange = 360 - 1;
    const newRange = (2 - 0);
    let radianPoint = (((rotatedDegreePoint - 1) * newRange) / oldRange) + 0;
    return radianPoint
  }

  render() {
    console.log("insidecanvas", this.props)
    return(
      <canvas ref="canvas" width={100} height={100} />
    )
  }
}

export default Canvas
