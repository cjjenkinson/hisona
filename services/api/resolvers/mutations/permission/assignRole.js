/**
 * permission.js Mutations
 *
 * @description: A set of GraphQL mutations for managing permissions.
 */

import UserError from '../../../utils/UserError'
import {
  findUserIdByEmail,
  findRoleIdByName,
  userRoleExists,
  createUserRole
} from '../../../utils/permission'

export default async (root, args, context, info) => {
  const roleId = await findRoleIdByName(context, args.role)
  const userId = await findUserIdByEmail(context, args.assigneeEmail)
  const userRoleExistsRes = await userRoleExists(context, {
    userId,
    roleId,
  })

  if (userRoleExistsRes) {
    throw new UserError(`${args.assigneeEmail} already has ${args.role} rights`)
  }

  return await createUserRole(
    root,
    {
      userId,
      roleId,
    },
    context,
  )
};
