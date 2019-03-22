/**
 * User.js Queries
 *
 * @description: A set of GraphQL queries for managing users.
 */

import { getUserId } from '../../../utils/auth'

export default async (root, args, context, info) => {
    const userId = await getUserId(context)

    return await context.db.query.user(
      {
        where: {
          id: userId,
        },
      },
      info,
    )
};

