import getHaversineDistance from 'Utils/mapUtils/getHaversineDistance'
import getElevationBounds from 'Utils/mapUtils/getElevationBounds'
import groupTracksByDate from 'Utils/mapUtils/groupTracksByDate'
import getElevationGainLoss from 'Utils/mapUtils/getElevationGainLoss'
import makeTracksByDate from 'Utils/mapUtils/makeTracksByDate'
import normalizeGPXData from 'Utils/mapUtils/normalizeGPXData'

import getAverageGeoLocation from 'Utils/mapUtils/getAverageGeoLocation'
import format from 'date-fns/format';
import BigNumber from "bignumber.js"

//import getCoordinateBounds from 'Utils/mapUtils/getCoordinateBounds'
const DescribeGPX = (data) => {
  console.log(data)
  const parsedData = normalizeGPXData(data)
  console.log('parsedData', parsedData)
  const originalGPXTrack = data.trk.trkseg.trkpt
  const originalGPXInfo = normalizeGPXData(data).info
  const originalTripName = data.trk.name || `New Track - ${format(new Date(2014, 1, 11), 'MM/dd/yyyy')}`
  
  return new Promise((resolve) => {
    try {
      //Separate out GPX by day, make basic array from grouped dates
      const daysArray = groupTracksByDate(originalGPXTrack);
      
      //Split out tracks by date
      makeTracksByDate(daysArray, originalGPXTrack)

      //Describe GPX data for each day
      daysArray.map((e) => {
        //Vars
        const trk = e.track
        const trkLength = trk.length

        //Get Average GEO Center for each day
        const centerPoint = getAverageGeoLocation(e.track)
        
        //Track iteration values
        let totalDayDistance = 0
        let ascent = 0
        let descent = 0
        let eleBounds = {
          elevationHighest: null,
          elevationLowest: null,
        }

        trk.map((f, j) => {
          const total = e.track.length
          //Get Haversine Distance for each track Point
          let distanceToNextPoint;
          if (j < total - 1) {
            const { lat, lng } = f
            const lat2 = trk[j + 1]['lat']
            const lng2 = trk[j + 1]['lng']
            distanceToNextPoint = getHaversineDistance({ lat: lat, lng: lng }, { lat: lat2, lng: lng2 })
            totalDayDistance = totalDayDistance + distanceToNextPoint
            totalDayDistance = totalDayDistance = +totalDayDistance.toFixed(2)

            //Get elevation gain and loss for each day
            const ele1 = f.ele
            const ele2 = trk[j + 1]['ele']
            const eleChange = getElevationGainLoss(ele1, ele2)
            //Tally total elevation change for day
            ascent = new BigNumber(ascent).plus(eleChange.ascent).toNumber()
            descent = new BigNumber(descent).plus(eleChange.descent).toNumber()
            
            //Get Elevation Bounds for each day
            eleBounds = getElevationBounds(eleBounds.elevationHighest, eleBounds.elevationLowest, f.ele)
            //Set values for individual track segments
            Object.assign(f, { 
              distanceToNextPoint: distanceToNextPoint,
              ...eleChange
            })

          }
        })

        //Set values for each day
        Object.assign(e, {
          elevationHighest: eleBounds.elevationHighest, 
          elevationLowest: eleBounds.elevationLowest,
          centralCoords: { lat: centerPoint.lat, lng: centerPoint.lng },
          distance: totalDayDistance,
          elevationGain: ascent,
          elevationLoss: descent,
          trackPtStart: trk[0],
          trackPtEnd: trk[trkLength - 1],
        })
      })
      // Generate data for entire trip
      let overallCentralCoords = []
      let totalDistance = 0
      let totalElevationGain = 0
      let totalElevationLoss = 0
      let overallEleBounds = {
        elevationHighest: null,
        elevationLowest: null,
      }
      daysArray.map((e) => {
        //Get Overall Central Track Point
        overallCentralCoords.push({ ...e.centralCoords })
        totalDistance = totalDistance + e.distance
        //Get Overall Elevation Change
        totalElevationGain = new BigNumber(totalElevationGain).plus(e.elevationGain).toNumber()
        totalElevationLoss = new BigNumber(totalElevationLoss).plus(e.elevationLoss).toNumber()
        //Get Overall Elevation Bounds (check both lowest and highest from each day)
        overallEleBounds = getElevationBounds(overallEleBounds.elevationHighest, overallEleBounds.elevationLowest, e.elevationHighest)
        overallEleBounds = getElevationBounds(overallEleBounds.elevationHighest, overallEleBounds.elevationLowest, e.elevationLowest)
      })
      const tripCentralCoords = getAverageGeoLocation(overallCentralCoords)

      resolve({
        name: originalTripName,
        id: '',
        info: originalGPXInfo,
        days: daysArray,
        totalDistance: totalDistance,
        dayCount: daysArray.length,
        dateFirst: daysArray[0]['date'],
        dateLast: daysArray[daysArray.length - 1]['date'],
        trackPtCount: originalGPXTrack.length,
        centralCoords: tripCentralCoords,
        totalElevationGain: totalElevationGain,
        totalElevationLoss: totalElevationLoss,
        overallElevationHighest: overallEleBounds.elevationHighest,
        overallElevationLowest: overallEleBounds.elevationLowest,
      })

    }catch(err){
      console.log(err)
      throw new Error('There was an issue while reading GPX data')
    }
  })

}

export default DescribeGPX
