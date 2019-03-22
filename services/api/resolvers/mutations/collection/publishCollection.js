/**
 * collection.js Mutations
 *
 * @description: A set of GraphQL mutations for managing collections.
 */

import UserError from '../../../utils/UserError'
import { getUserId } from '../../../utils/auth'

export default async (root, args, context, info) => {
  const userId = await getUserId(ctx)
  const collection = await ctx.db.exists.Collection({
    id,
    owner: { id: userId },
  })

  if (!collection) {
    throw new UserError(`Collection not found or you're not the owner`)
  }

  if (!collection.published) {
    return await ctx.db.mutation.updateCollection(
      {
        where: { id },
        data: { isPublished: true },
      },
      info,
    )
  }
}
