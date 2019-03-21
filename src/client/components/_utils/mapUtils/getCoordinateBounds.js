const getCoordinateBounds = (daysArr, trackData) => {

  return daysArr.map((e) => {

    const { indexStart, indexEnd } = e
    let latHighest = null;
    let latLowest = null;
    let lonHighest = null;
    let lonLowest = null;

    for (let i = indexStart; i <= indexEnd; i++) {
      const lat = trackData[i]['@_lat']
      const lon = trackData[i]['@_lon']

      //Find Lat Bounds
      if (lat > latHighest || latHighest === null) {
        latHighest = lat
      }
      if (lat < latLowest || latLowest === null) {
        latLowest = lat
      }

      //Find Lon Bounds
      if (lon > lonHighest || lonHighest === null) {
        lonHighest = lon
      }
      if (lon < lonLowest || lonLowest === null) {
        lonLowest = lon
      }

    }
    console.log(latHighest, latLowest, lonHighest, lonLowest)
    //return Object.assign(e, { elevationHighest: elevationHighest, elevationLowest: elevationLowest })

  })
}

export default getCoordinateBounds

//Will need to work out negative values