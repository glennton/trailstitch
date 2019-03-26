const getHaversineDistance = (coords1, coords2) => {
  const toRad = (x) => {
    return x * Math.PI / 180;
  }
  let lat1 = coords1.lat
  let lon1 = coords1.lng
  let lat2 = coords2.lat
  let lon2 = coords2.lng

  const R = 6371; // km 
  const x1 = lat2 - lat1;
  const dLat = toRad(x1)
  const x2 = lon2 - lon1;
  const dLon = toRad(x2)
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c)
}

export default getHaversineDistance

//https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript
//Alternative: https://stackoverflow.com/questions/21279559/geolocation-closest-locationlat-long-from-my-position