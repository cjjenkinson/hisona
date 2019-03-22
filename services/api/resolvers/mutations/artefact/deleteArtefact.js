/**
 * artefact.js Mutations
 *
 * @description: A set of GraphQL mutations for managing artefacts.
 */

import UserError from '../../../utils/UserError'

export default async (root, args, context, info) => {
  const artefactExists = await context.db.exists.Artefact({
    id,
    collection: { id: args.id },
  })

  if (!artefactExists) {
    throw new UserError(`Artefact does not exist`)
  }

  await context.db.mutation.deleteArtefact({ where: { args.id } })

  return { success: true }
};
