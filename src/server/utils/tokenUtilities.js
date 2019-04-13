import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRY } from '../auth/jwt'

export const validateToken = async (token) => {
  try {
    return await jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new Error('Authentication Error')
      }
      return decoded
    })
  } catch (error) {
    throw new Error('Unknown Error')
  }
}

export const signToken = async ({ _id, firstName, lastName, gpxRecord }) => {
  const signedUser = {
    _id, 
    firstName, 
    lastName, 
    gpxRecord,
    authenticated: true
  }
  try {
    return await jwt.sign(signedUser, JWT_SECRET, { expiresIn: JWT_EXPIRY() });
  } catch (error) {
    console.log(error)
    throw new Error('Unknown Error')
  }
}