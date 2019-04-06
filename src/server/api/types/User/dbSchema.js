import mongoose from 'mongoose'

const Schema = mongoose.Schema

const dbSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
  password: {
    type: String,
    required: true,
  },
  email: String,
  gpxRecord: { type: Schema.Types.ObjectId, ref: 'GpxRecord',},
})

export default dbSchema