/**
 * auth.js Queries
 *
 * @description: A set of GraphQL queries for managing authentication.
 */

require('dotenv').config()
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import UserError from '../../../utils/UserError'
import { USER } from '../../../utils/permission'

export default async (root, args, context, info) => {
    const user = await context.db.query.user(
      {
        where: {
          email: args.email,
        },
      },
      `{ id password }`,
    )

    if (!user) {
      throw new UserError(`No user with the email ${args.email}.`)
    }

    const valid = await bcrypt.compare(args.password, user.password)

    if (!valid) {
      throw new UserError(`The password is incorrect.`)
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.API_TOKEN_SECRET,
    )

    return {
      token,
      user,
    }
}
