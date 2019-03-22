/**
 * artefact.js Queries
 *
 * @description: A set of GraphQL queries for managing artefacts.
 */

import UserError from '../../../utils/UserError'

export default async (root, args, context, info) => {

  const { where } = args

  const artefacts = await context.db.query.artefacts({ where }, info)

  if (!artefacts.length) {
    throw new UserError(`No artefact exists`)
  }

  return artefacts
};
