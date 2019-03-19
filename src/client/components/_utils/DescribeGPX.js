const DescribeGPX = (data) => {
  //Common Variables
  const newData = data.trk.trkseg.trkpt
  const waypointCount = newData.length
  //Distance
  let distance = 0
  const toRad = (x) => {
    return x * Math.PI / 180;
  }
  const getHaversineDistance = (lat1, lon1, lat2, lon2) => {
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
  //Elevation Change
  let elevChange = { ascent: 0, descent: 0 };
  const calcElevationChange = (elevPrev, elevNew) => {
    const change = elevNew - elevPrev //Get difference  20 50 = -30
    const absChange = Math.abs(change) //Get absolute value of change
    if (absChange && change > 0) {
      elevChange.ascent = elevChange.ascent + absChange
    } else {
      if (absChange) {
        elevChange.descent = elevChange.descent + absChange
      }
    }
  }
  //Const Get Bounds
  let eleBounds = {top:null, bot:null}
  let latLonBounds = {}
  const getEleBounds = (elev) => {
    eleBounds.top = (elev > eleBounds.top) || (eleBounds.top === null) ? elev : eleBounds.top
    eleBounds.bot = (elev < eleBounds.bot) || (eleBounds.bot === null) ? elev : eleBounds.bot
  }

  //Day Change
  let days = []
  let dayIndex = 0;
  const onDayChange = (currentKey, nextKey, i) => {
    if(i!=0){ //Not First Day      
      if (nextKey) {//Set Day Start Point (Create New Object) only if not last day or first day
        days.push({ date: nextKey, startPoint: newData[i + 1], endPoint: {}, ele: {}, distance: 0, eleBounds:{ top: null, bot: null } })
      }
      days[dayIndex]['endPoint'] = newData[i] //Set Day End Point (Existing Object) only if not first day
      days[dayIndex]['ele'] = elevChange //Set Elevation
      days[dayIndex]['eleBounds'] = eleBounds //Set Elevation Bounds
      elevChange = { ascent: 0, descent: 0 }; //Reset Elevation
      days[dayIndex]['distance'] = distance //Set Distance
      distance = 0 //Reset Distance
      dayIndex++ //Increment Day Index
    }else{
      days.push({ date: currentKey, startPoint: newData[0], endPoint: {}, ele: {}, distance: 0 }) //Set First Day
    }
  }

  return new Promise((resolve)=>{
    try{
      newData.map((e, i) => {
        const currentKey = e.time.split("T").shift()
        const nextKey = newData[i + 1] ? newData[i + 1].time.split("T").shift() : null        
        if (nextKey) { 
          getEleBounds(e.ele)
          calcElevationChange(e.ele, newData[i + 1].ele) 
          getHaversineDistance(e["@_lat"], e["@_lon"], newData[i+1]["@_lat"], newData[i+1]["@_lon"])
        } //Set Elevation except for last item        
        if(currentKey != nextKey || i === 0){ //Set Start and End points
          onDayChange(currentKey, nextKey, i);
        }
      })
      console.log(distance)
      resolve({ 
        days: days,
        dayCount: days.length,
        firstDay: newData[0]['time'],
        lastDay: newData[waypointCount - 1]['time'],
      })
    }catch(err){
      throw new Error('There was an issue reading data')
    }
  })

}

export default DescribeGPX


//https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript