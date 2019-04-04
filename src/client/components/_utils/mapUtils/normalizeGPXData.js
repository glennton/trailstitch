import gpx1dot1 from 'Utils/mapUtils/GPXSchemasParsers/gpx1dot1'

// const removeEmptyFields = (obj) => {
//   // obj.reduce((a, e)=>{
//   //   console.log(e)
//   // })
// }

const normalizeGPXData = (data) => {
  let parsedData = {
    info: null,
    track: null,
    name: null,
  }
  //removeEmptyFields(data)
  if (data['@_xmlns'] && data['@_xmlns'] === 'http://www.topografix.com/GPX/1/1'){
    parsedData.info = gpx1dot1.info(data)
    parsedData.name = data.trk.name
    parsedData.track = data.trk.trkseg.trkpt
  }
  console.log('parsedData', parsedData)
  return parsedData
}

export default normalizeGPXData