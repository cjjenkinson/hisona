/**
 * auth.js Utilities
 *
 * @description: A set of utilities for auth.
 */

require('now-env')
import jwt from 'jsonwebtoken'
import UserError from './UserError'

export const getUserId = async (context) => {
  const Authorization = await context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.API_TOKEN_SECRET)
    return userId
  }

  throw new UserError('Not authenticated')
}

export const createToken = userId =>
  jwt.sign({ userId, expiresIn: '7d' }, process.env.API_TOKEN_SECRET)
