const getElevationGainLoss = (daysArr, trackData) => {

  return daysArr.map((e) => {

    const { indexStart, indexEnd } = e

    let ascent = 0
    let descent = 0

    for (let i = indexStart; i < indexEnd; i++) {

      const currentElevation = trackData[i]['ele']
      const nextElevation = trackData[ i+ 1]['ele']
      const change = nextElevation - currentElevation //Get difference  20 50 = -30
      const absChange = Math.abs(change) //Get absolute value of change

      if (absChange && change > 0) {
        ascent = ascent + absChange
      } else {
        if (absChange) {
          descent = descent + absChange
        }
      }

    }
    return Object.assign(e, { elevationGain: ascent, elevationLoss: descent })
  })
}

export default getElevationGainLoss

//https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript