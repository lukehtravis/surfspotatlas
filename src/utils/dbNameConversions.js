import {monthToDayConversion} from "../utils/constants";
/*
This file is used to create functions that will convert some of the names for
plain data in the database into more readable dataforms for rendering
*/

export const directionStringConverter = (waveDirectionString) => {
  if (waveDirectionString === "right") {
    return "Right"
  }
  if (waveDirectionString === "left") {
    return "Left"
  }
  if (waveDirectionString === "rightleft") {
    return "Right & Left"
  }
  if (waveDirectionString !== "right" || waveDirectionString !== "left" || waveDirectionString !== "rightleft" ) {
    return "Mysterious"
  }
}

export const bathymetryStringConverter = (bathymetryString) => {
  if (bathymetryString === "sand") {
    return "Sand"
  }
  if (bathymetryString === "reef") {
    return "Reef"
  }
  if (bathymetryString === "sand-reef") {
    return "Sand & Reef"
  }
  if (bathymetryString !== "sand" || bathymetryString !== "reef" || bathymetryString !== "sand-reef" ) {
    return "Mysterious"
  }
}

export const waveTypeStringConverter = (waveTypeString) => {
  if (waveTypeString === "pointbreak") {
    return "Point Break"
  }
  if (waveTypeString === "reefbreak") {
    return "Reef Break"
  }
  if (waveTypeString === "beachbreak") {
    return "Beach Break"
  }
  if (waveTypeString !== "pointbreak" || waveTypeString !== "reefbreak" || waveTypeString !== "beachbreak" ) {
    return "Mysterious"
  }
}

export const convertMonthToDay = (monthName) => {
  return monthToDayConversion[monthName]
}
