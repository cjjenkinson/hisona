/**
 * auth.js Queries
 *
 * @description: A set of GraphQL queries for managing authentication.
 */

require('now-env')
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import UserError from '../../../utils/UserError'
import { createToken } from '../../../utils/auth'
import { USER, findRoleIdByName, createUserRole } from '../../../utils/permission'

export default async (root, args, context, info) => {
    const password = await bcrypt.hash(args.password, 10)

    const user = await context.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
        },
      },
      `{ id }`,
    )

    const { id } = user

    const roleId = await findRoleIdByName(context, USER)

    const userRole = await createUserRole(
      root,
      { userId: id, roleId },
      context,
    )

    const token = await createToken(id)

    return {
      token,
      user,
    }
}
