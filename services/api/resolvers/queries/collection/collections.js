/**
 * collection.js Queries
 *
 * @description: A set of GraphQL queries for managing collections.
 */

import { getUserId } from '../../../utils/auth'
import UserError from '../../../utils/UserError'

export default async (root, args, context, info) => {
    const id = await getUserId(context)

    const where = {
      owner: {
        id,
      }
    }

    // TODO: Manage curator permissions and members

    const collections = await context.db.query.collections({ where }, info)

    if (!collections.length) {
      throw new UserError('No collections exist')
    }

    return collections;
};


// feed: async (parent, args, ctx, info) => {
//   return ctx.db.query.posts({ where: { isPublished: true } }, info)
// },

// drafts: async (parent, args, ctx, info) => {
//   const id = await getUserId(ctx)

//   const where = {
//     isPublished: false,
//     author: {
//       id,
//     },
//   }

//   return ctx.db.query.posts({ where }, info)
// },

// post: async (parent, { id }, ctx, info) => {
//   return ctx.db.query.post({ where: { id } }, info)
// },
