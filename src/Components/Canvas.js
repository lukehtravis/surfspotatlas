import React, {Component} from "react";

class Canvas extends Component {

  componentDidMount() {
    const points = this.convertNumericRange([180,270])
    const canvas = this.refs.canvas
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(100, 75, 50, points[0] * Math.PI, points[1] * Math.PI);
    ctx.stroke();
  }

  convertNumericRange(arrayOfPoints) {
    let convertedPoints = []
    arrayOfPoints.map(point => {
      const oldRange = 360 - 1
      const newRange = (2 - 0)
      let newPoint = (((point - 1) * newRange) / oldRange) + 0
      convertedPoints.push(newPoint)
    })
    return convertedPoints
  }

  render() {
    return(
      <canvas ref="canvas" width={400} height={400} />
    )
  }
}

export default Canvas
