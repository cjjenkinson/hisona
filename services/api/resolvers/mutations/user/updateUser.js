/**
 * user.js Mutations
 *
 * @description: A set of GraphQL mutations for managing users.
 */

import { getUserId } from '../../../utils/auth'

export default async (root, args, context, info) => {
    const userId = getUserId(context)
    const user = await context.db.mutation.updateUser(
      {
        data: {
          name: args.name,
        },
        where: {
          id: userId,
        },
      },
      info,
    )
    return user
}
