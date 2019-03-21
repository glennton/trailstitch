import getHaversineDistance from 'Utils/mapUtils/getHaversineDistance'
import getElevationBounds from 'Utils/mapUtils/getElevationBounds'
import averageGeolocation from 'Utils/mapUtils/averageGeolocation'
import trackIndexesByDate from 'Utils/mapUtils/trackIndexesByDate'

const DescribeGPX = (data) => {

  const newData = data.trk.trkseg.trkpt

  return new Promise((resolve) => {
    try {
      const daysArray = trackIndexesByDate(newData);
      getElevationBounds(daysArray, newData)
      averageGeolocation(daysArray, newData)
      getHaversineDistance(daysArray, newData)

      resolve({
        days: daysArray,
        dayCount: daysArray.length,
        dateFirst: daysArray[0]['date'],
        dateLast: daysArray[daysArray.length - 1]['date'],
        pointCount: newData.length
      })

    }catch(err){
      throw new Error('There was an issue while reading GPX data')
    }
  })

}

export default DescribeGPX
