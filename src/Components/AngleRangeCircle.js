import React, {Component} from "react";
import Canvas from "./Canvas";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import { useAuth0 } from "../react-auth0-wrapper";
import {withStyles} from "@material-ui/core/styles";
import WaveAttributeVote from "./WaveAttributeVote";
import Typography from "@material-ui/core/Typography";
import {FETCH_WIND_ANGLES} from "../utils/queries";
import ReactSVG from 'react-svg';
import "../css/Compass.css";

const defaultFontSize = 16
const circleBoundary = 150
const circleBoundaryComparator = 100 /* for font sizing relative to circle size */
const circleFontScalar = circleBoundary / circleBoundaryComparator
const circleCenterXY = circleBoundary * 0.5
const circleRadius = circleCenterXY * 0.7
const circleBorderStrokeWidth = circleBoundary * 0.06

const styles = theme => ({
  north: {
    top: `-${circleBoundary * 0.25}px`,
    left: `${circleBoundary * 0.455}px`,
    position: "absolute"
  },
  east: {
    top: `${circleBoundary * 0.38}px`,
    right: `-${circleBoundary * 0.18}px`,
    position: "absolute"
  },
  south: {
    bottom: `-${circleBoundary * 0.20}px`,
    left: `${circleBoundary * 0.37}px`,
    position: "absolute"
  },
  west: {
    top: `${circleBoundary * 0.38}px`,
    left: `-${circleBoundary *0.32}px`,
    position: "absolute"
  },
  compass: {
    position: "relative",
    margin: "0 auto",
    position: "relative"
  },
  positionedElement: {
    position: "absolute"
  },
  circleFonts: {
    fontSize: `${defaultFontSize * circleFontScalar}px`
  },
  northFont: {
    fontSize: "12px",
    color: "#616161",
    textAlign: "center",
  }
})

const AngleRangeCircle = (props) => {
  const {classes} = props;
  const { isAuthenticated, user } = useAuth0()
  const windAngleOne = props.attributeValue[0]
  const windAngleTwo = props.attributeValue[1]

  console.log("windangles", props, windAngleOne, windAngleTwo)
  return (
    <div className={`${classes.circleFonts} ${classes.compass}`} >
      <Typography className={classes.northFont}>0° N</Typography>
      <Canvas className={classes.positionedElement} circleBoundary={circleBoundary} circleRadius={circleRadius} circleCenterXY={circleCenterXY} windAngleOne={windAngleOne} windAngleTwo={windAngleTwo} />
      {/* isAuthenticated && (
          <div className="wind-angle">
            <WaveAttributeVote
              voteOnAttribute={props.voteOnAttribute}
              attributeValue={props.attributeValue}
              attributeName={props.attributeName}
            />
          </div>
        ) */}
    </div>
  )
}

export default withStyles(styles)(AngleRangeCircle);
