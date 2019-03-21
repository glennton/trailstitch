const getElevationBounds = (daysArr, trackData) => {

  return daysArr.map((e)=>{

    const { indexStart, indexEnd } = e
    let elevationHighest = null;
    let elevationLowest = null;

    for (let i = indexStart; i <= indexEnd; i++) {
      const elevation = trackData[i]['ele']
      if (elevation > elevationHighest || elevationHighest === null) {
        elevationHighest = elevation
      }
      if (elevation < elevationLowest || elevationLowest === null) {
        elevationLowest = elevation
      }
    }

    return Object.assign(e, { elevationHighest: elevationHighest, elevationLowest: elevationLowest })

  })
}

export default getElevationBounds