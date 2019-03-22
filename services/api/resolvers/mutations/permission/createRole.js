/**
 * permission.js Mutations
 *
 * @description: A set of GraphQL mutations for managing permissions.
 */

export default async (root, args, context, info) => {
  return await context.db.mutation.createRole(
    {
      data: args,
    },
    info,
  )
};
