import React, {Component} from "react";

class Canvas extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const points = this.convertNumericRange([this.props.windAngleOne,this.props.windAngleTwo])
    this.drawRangeOfAttributes(points)
    this.drawRemainingCircle(points, "blue")
    this.drawTextInsideCircle(this.props.windAngleOne, this.props.windAngleTwo);
  }

  drawRangeOfAttributes(arcBoundries) {
    const canvas = this.refs.canvas
    var ctx = canvas.getContext("2d");
    ctx.arc(this.props.circleCenterXY, this.props.circleCenterXY, this.props.circleRadius, arcBoundries[0] * Math.PI, arcBoundries[1] * Math.PI);
    ctx.strokeStyle = "red";
    ctx.stroke();
  }

  drawRemainingCircle(arcBoundries, color) {
    const canvas2 = this.refs.canvas
    let ctx2 = canvas2.getContext("2d");
    ctx2.beginPath();
    ctx2.arc(this.props.circleCenterXY, this.props.circleCenterXY, this.props.circleRadius, arcBoundries[1] * Math.PI, arcBoundries[0] * Math.PI);
    ctx2.strokeStyle = color;
    ctx2.stroke();
  }

  drawTextInsideCircle(angleOne, angleTwo) {
    const canvas3 = this.refs.canvas
    let ctx3 = canvas3.getContext("2d");
    ctx3.font = "14px Arial";
    ctx3.fillText(angleOne + " - " + angleTwo, 18, 52);
  }

  convertNumericRange(arrayOfArcPoints) {
    // parts of solution from https://stackoverflow.com/questions/929103/convert-a-number-range-to-another-range-maintaining-ratio
    // Here we must convert 0 - 360 (compass degree scale) to a 0-2 (<canvas> radians)
    // number scale, as well as prepare our arc to appear on the proper circle
    let convertedPoints = []
    arrayOfArcPoints.map(point => {
      point = this.rotateArc(point);
      let convertedRadianPoint = this.convertCompassDegreesToRadians(point)
      convertedPoints.push(convertedRadianPoint);
    })
    return convertedPoints
  }

  rotateArc(point) {
    // This function is necessary because the degrees of a compass are measured from 0 - 360
    // where zero is the top of the circle, and the degrees increment up clockwise
    // However, the canvas tool we are using to draw the circle use the right side of the circle
    // as a starting point (and also increments up clockwise). Therefore, we need to rotate our range 90 degrees left (-90) so that
    // we can feed a range to the convertCompassDegreesToRadians() function, which will convert it
    // to a radian value
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
    return(
      <canvas ref="canvas" width={this.props.circleBoundary} height={this.props.circleBoundary} />
    )
  }
}

export default Canvas
