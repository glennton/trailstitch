//Group days by date, define start index and end index pointers
const groupTracksByDate = (data) => {

  let currentKey = null
  let nextKey = null
  let daysArrCounter = 0
  let daysArr = []

  data.map((e, i) => {
    
    //Set date value for current key and next key
    currentKey = e.time.split("T").shift() ? e.time.split("T").shift() : null
    nextKey = data[i + 1] ? data[i + 1].time.split("T").shift() : null
    
    if (i === 0) {
      //Push first item into array
      daysArr.push({ date: currentKey, indexStart: i, indexEnd: null })

    } else if (currentKey !== nextKey) {
      //Set end index for current key, start new object for next key (if not end of array)
      if (nextKey) {
        daysArr.push({ date: nextKey, indexStart: (i + 1), indexEnd: null })
      }

      //Set End Date
      daysArr[daysArrCounter]['indexEnd'] = i
      
      //increment counter
      daysArrCounter++
    }

  })
  return daysArr
}

export default groupTracksByDate