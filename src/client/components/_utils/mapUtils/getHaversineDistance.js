const getHaversineDistance = (daysArr, trackData) => {
  const toRad = (x) => {
    return x * Math.PI / 180;
  }
  return daysArr.map((e) => {

    const { indexStart, indexEnd } = e
    let distance = 0

    for (let i = indexStart; i < indexEnd; i++) {
      
      let lat1 = trackData[i]['@_lat']
      let lon1 = trackData[i]['@_lon']
      let lat2 = trackData[i + 1]['@_lat']
      let lon2 = trackData[i + 1]['@_lon']

      const R = 6371; // km 
      const x1 = lat2 - lat1;
      const dLat = toRad(x1)
      const x2 = lon2 - lon1;
      const dLon = toRad(x2)
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      distance = distance + (R * c)
    }
    return Object.assign(e, { distance: distance })
  })
}

export default getHaversineDistance


//https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript