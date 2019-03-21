const averageGeolocation = (daysArr, trackData) => {

  return daysArr.map((e) => {

    const { indexStart, indexEnd } = e
    let x = 0.0;
    let y = 0.0;
    let z = 0.0;

    for (let i = indexStart; i <= indexEnd; i++) {
      const coords = trackData[i]
      let lat = coords['@_lat'] * Math.PI / 180;
      let lon = coords['@_lon'] * Math.PI / 180;

      x += Math.cos(lat) * Math.cos(lon);
      y += Math.cos(lat) * Math.sin(lon);
      z += Math.sin(lat);
    }

    const total = indexEnd - indexStart +1;

    x = x / total;
    y = y / total;
    z = z / total;

    const centralLongitude = Math.atan2(y, x);
    const centralSquareRoot = Math.sqrt(x * x + y * y);
    const centralLatitude = Math.atan2(z, centralSquareRoot);

    const latitude = centralLatitude * 180 / Math.PI
    const longitude = centralLongitude * 180 / Math.PI

    return Object.assign(e, { centralLat: latitude, centralLon: longitude })
  })
}

export default averageGeolocation

//https: //gist.github.com/tlhunter/0ea604b77775b3e7d7d25ea0f70a23eb