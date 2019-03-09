import mongoose from 'mongoose'
import dbCredentials from 'Auth/database.js'
import {OPTIONS, URI} from 'Config/database.js'

const dbOptions = Object.assign(dbCredentials, OPTIONS);

const db = async () => {
  //No need for async as mongoose buffers model functions internally
  try {
    await mongoose.connect(URI, dbOptions)
  }catch(err){
    console.log('MongoDB Connection Error:', err)
  }
}

export default db