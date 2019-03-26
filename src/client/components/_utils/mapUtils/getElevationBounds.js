const getElevationBounds = (elevationHighest, elevationLowest, newElevation) => {

  if (newElevation > elevationHighest || elevationHighest === null) {
    elevationHighest = newElevation
  }
  if (newElevation < elevationLowest || elevationLowest === null) {
    elevationLowest = newElevation
  }
  return { elevationHighest: elevationHighest, elevationLowest: elevationLowest }
}

export default getElevationBounds