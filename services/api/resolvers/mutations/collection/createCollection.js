/**
 * collection.js Mutations
 *
 * @description: A set of GraphQL mutations for managing collections.
 */

import UserError from '../../../utils/UserError'
import { getUserId } from '../../../utils/auth'
import {
  OWNER,
  findRoleIdByName,
  userRoleExists,
  createUserRole,
} from '../../../utils/permission'

export default async (root, args, context, info) => {
  const userId = await getUserId(context)

  const roleId = await findRoleIdByName(context, OWNER)

  const userRoleExistsRes = await userRoleExists(context, {
    userId,
    roleId,
  })

  const collectionData = {
    data: {
      ...args,
      owner: {
        connect: {
          id: userId,
        },
      },
    },
  }

  if (!userRoleExistsRes) {
    const userRole = await createUserRole(root, { userId, roleId }, context)
    return await context.db.mutation.createCollection(collectionData, info)
  }

  return await context.db.mutation.createCollection(collectionData, info)
}
