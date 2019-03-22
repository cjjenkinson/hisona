/**
 * collection.js Mutations
 *
 * @description: A set of GraphQL mutations for managing collections.
 */

import UserError from '../../../utils/UserError'
import { getUserId } from '../../../utils/auth'

export default async (root, args, context, info) => {
  const userId = await getUserId(context)

  const collectionExists = await context.db.exists.Collection({
    id,
    owner: { id: userId },
  })

  if (!collectionExists) {
    throw new UserError(`Collection not found or you're not the owner`)
  }

  // TODO
  // check if last collection, if so remove owner role from user

  await context.db.mutation.deleteCollection({ where: { id } })

  return { success: true }
}
