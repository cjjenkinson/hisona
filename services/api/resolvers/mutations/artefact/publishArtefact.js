/**
 * artefact.js Mutations
 *
 * @description: A set of GraphQL mutations for managing artefacts.
 */

import UserError from '../../../utils/UserError'

export default async (root, args, context, info) => {
  const artefactExists = await ctx.db.exists.Artefact({
    id,
    collection: { id: args.id },
  })

  if (!artefactExists) {
    throw new UserError(`Artefact does not exist`)
  }

  return ctx.db.mutation.updateArtefact(
    {
      where: { id: args.id },
      data: { isPublished: true },
    },
    info,
  )
}
