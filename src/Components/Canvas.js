import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
/*

This component takes in averaged user input about what the best wind angles for this spot are,
and uses it to draw a circle which represents wind angles as if they were degrees on a compass.
The .arc function of the js canvas element is used. Two seperate lines must be drawn with arc
1. The line that represents the actual values inside of the range (drawRangeOfAttributes)
2. The line that represents everything outside of the specified range (drawRemaining Circle)

After that, points are drawn on the circle which correspond to the start and end of the range, which act
as labels

TODO - Improve and extend docs here

*/
const styles = theme => ({
  color: theme.palette.primary,
  pointAttributes: {
    pointType: theme.typography.fontSize,
    pointFont: theme.typography.fontFamily,
    pointColor: "#3f51b5"
  }
})

class Canvas extends Component {

  componentDidMount() {
    const points = this.convertNumericRange([this.props.windAngleOne,this.props.windAngleTwo])
    this.drawRemainingCircle(points, "rgba(255, 181, 173, 0.3)")
    this.drawRangeOfAttributes(points, this.props.windAngleOne, this.props.windAngleTwo)
    // this.drawTextInsideCircle(this.props.windAngleOne, this.props.windAngleTwo);
  }

  drawRangeOfAttributes(arcBoundries, windAngleOne, windAngleTwo) {
    // first, the part of the circle that will represent the provided range is drawn
    const canvas = this.refs.canvas
    canvas.style.width=this.props.circleBoundary;//actual width of canvas
    canvas.style.height=this.props.circleBoundary;//actual height of canvas
    var ctx = canvas.getContext("2d");
    ctx.beginPath()
    ctx.arc(this.props.circleCenterXY, this.props.circleCenterXY, this.props.circleRadius, arcBoundries[0] * Math.PI, arcBoundries[1] * Math.PI);
    // thanks to auto-monkey for the following 4 lines
    // https://math.stackexchange.com/questions/184639/how-do-i-find-the-start-and-end-point-of-an-arc-using-center-xy-radius-and-sta
    let sX = this.props.circleCenterXY + this.props.circleRadius * Math.cos(arcBoundries[0] * Math.PI);
    let sY = this.props.circleCenterXY + this.props.circleRadius * Math.sin(arcBoundries[0] * Math.PI);
    let eX = this.props.circleCenterXY + this.props.circleRadius * Math.cos(arcBoundries[1] * Math.PI);
    let eY = this.props.circleCenterXY + this.props.circleRadius * Math.sin(arcBoundries[1] * Math.PI);
    let gradient = ctx.createLinearGradient(sX, sY, eX, eY)
    gradient.addColorStop(0, "rgba(255, 92, 141, 0.9)") // red
    gradient.addColorStop(.1, "rgba(255, 149, 92, 1)") // red
    gradient.addColorStop(.5, "rgba(255, 108, 92, 1)") // yellow
    gradient.addColorStop(.9, "rgba(255, 149, 92, 1)") // red
    gradient.addColorStop(1, "rgba(255, 92, 141, 0.9)") // red
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    this.drawPoint(sX, sY, ctx, windAngleOne)
    this.drawPoint(eX, eY, ctx, windAngleTwo)
  }

  drawRemainingCircle(arcBoundries, color) {
    // Next, the remainder of the circle (that which doesn't falle between the attribute values)
    // is drawn
    const canvas2 = this.refs.canvas
    let ctx2 = canvas2.getContext("2d");
    ctx2.beginPath();
    ctx2.arc(this.props.circleCenterXY, this.props.circleCenterXY, this.props.circleRadius, arcBoundries[1] * Math.PI, arcBoundries[0] * Math.PI);
    ctx2.strokeStyle = color;
    ctx2.lineWidth = 5;
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
    convertedPoints = arrayOfArcPoints.map(point => {
      point = this.rotateArc(point);
      let convertedRadianPoint = this.convertCompassDegreesToRadians(point)
      return convertedRadianPoint;
    })
    return convertedPoints
  }

  rotateArc(point) {
    // This function is necessary because the degrees of a compass are measured from 0 - 360
    // where zero is the top of the circle, and the degrees increment up clockwise
    // However, the canvas tool we are using to draw the circle uses the right side of the circle
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

  drawPoint(pointX, pointY, ctx, label){
    ctx.beginPath();
    ctx.arc(pointX,pointY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "#3f51b5";
    ctx.fill();
    ctx.fillStyle = "#616161";
    ctx.font = `normal 12px Helvetica`
    ctx.fillText(`${label.toFixed()}°`, pointX + 5, pointY );
  }

  render() {
    return(
      <canvas ref="canvas" width={this.props.circleBoundary} height={this.props.circleBoundary} />
    )
  }
}

export default withStyles(styles)(Canvas)
