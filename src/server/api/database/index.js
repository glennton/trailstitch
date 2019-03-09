import mongoose from 'mongoose'
import dbCredentials from 'Auth/database'
import dbConfig from 'Config/database'

//Combine credentials and options into one object to pass to mongo connect
const dbOptions = Object.assign(dbCredentials, dbConfig.OPTIONS);

//Use mongoose to connect to db, async not necessary because of buffer, but should implement in case there are connection issues
const db = async () => {
  try {
    await mongoose.connect(dbConfig.URI, dbOptions)
  }catch(err){
    console.log('MongoDB Connection Error:', err)
  }
}

export default db