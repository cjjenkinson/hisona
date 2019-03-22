/**
 * artefact.js Queries
 *
 * @description: A set of GraphQL queries for managing artefacts.
 */

export default async (root, args, context, info) => {
    return await context.db.query.artefacts(
      {
        where: {
          id: args.id,
        },
      },
      info,
    )
};
