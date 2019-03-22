/**
 * artefact.js Mutations
 *
 * @description: A set of GraphQL mutations for managing artefacts.
 */

import UserError from '../../../utils/UserError'

export default async (root, args, context, info) => {
  const artefact = await context.db.mutation.updateArtefact(
    {
      data: {
        name: args.name,
        shortDescription: args.shortDescription,
      },
      where: {
        id: args.id,
      },
    },
    info,
  )
  return artefact
}
