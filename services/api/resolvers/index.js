/**
 * GraphQL Prisma Resolvers
 *
 * @description: Resolver queries and mutations that interact with the Prisma service.
 */

import AuthPayload from './authPayload'
import UserQueries from './queries/user'
import CollectionQueries from './queries/collection'
import ArtefactQueries from './queries/artefact'

import AuthMutations from './mutations/auth'
import PermissionMutations from './mutations/permission'
import UserMutations from './mutations/user'
import CollectionMutations from './mutations/collection'
import ArtefactMutations from './mutations/artefact'

import CollectionSubscriptions from './subscriptions/collection'

export default {
  AuthPayload,
  Query: {
    ...UserQueries,
    ...CollectionQueries,
    ...ArtefactQueries,
  },
  Mutation: {
    ...AuthMutations,
    ...PermissionMutations,
    ...UserMutations,
    ...CollectionMutations,
    ...ArtefactMutations,
  },
  Subscription: {
    ...CollectionSubscriptions,
  },
}
