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
  } catch (err) {
    throw new Error('Error Validating Token', err)
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
  } catch (err) {
    throw new Error('Error Signing Token', err)
  }
}