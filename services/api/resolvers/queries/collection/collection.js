/**
 * collection.js Queries
 *
 * @description: A set of GraphQL queries for managing collections.
 */

export default async (root, args, context, info) => {

  const { where } = args;

  return await context.db.query.collections({ where }, info)
};
