const getStartAndEndCoords = (daysArr, trackData) => {

  return daysArr.map((e) => {

    const { indexStart, indexEnd } = e

    return Object.assign(e, { pointStart: trackData[indexStart], pointEnd: trackData[indexEnd] })

  })
}

export default getStartAndEndCoords

//Will need to work out negative values