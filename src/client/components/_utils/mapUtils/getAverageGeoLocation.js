const getAverageGeoLocation = (track) =>{
  let x = 0.0;
  let y = 0.0;
  let z = 0.0;

  const total = track.length
  track.map((e) => {
    let lat = e.lat * Math.PI / 180;
    let lng = e.lng * Math.PI / 180;
    x += Math.cos(lat) * Math.cos(lng);
    y += Math.cos(lat) * Math.sin(lng);
    z += Math.sin(lat);
  })


  x = x / total;
  y = y / total;
  z = z / total;

  const centralLongitude = Math.atan2(y, x);
  const centralSquareRoot = Math.sqrt(x * x + y * y);
  const centralLatitude = Math.atan2(z, centralSquareRoot);

  const latitude = centralLatitude * 180 / Math.PI
  const longitude = centralLongitude * 180 / Math.PI
  return { lat: latitude, lng: longitude }
}

export default getAverageGeoLocation

//https: //gist.github.com/tlhunter/0ea604b77775b3e7d7d25ea0f70a23eb