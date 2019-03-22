/**
 * permissions.js Middleware
 *
 * @description: A middleware to manage permissions.
 */

import { rule, and, or, not, shield } from 'graphql-shield'
import { getUserId } from '../../utils/auth'
import {
  findRoleIdByName,
  userRoleExists,
  availableRoles,
} from '../../utils/permission'
import strings from '../../utils/strings'

const typeRules = {
  isCollectionOwner: rule()(async (root, args, context, info) => {
    const collectionId = args.id
    const userId = await getUserId(context)
    const collection = await context.db.exists.Collection({
      id: collectionId,
      owner: {
        id: userId,
      },
    })
    return collection
  }),
  // is curator => has role, belongs to collection for artefact
}

const genericRules = () => {
  const rulesObj = {}
  availableRoles.forEach(role => {
    rulesObj[`is${strings.titleCase(role)}`] = rule()(
      async (root, args, context, info) => {
        const userId = await getUserId(context)
        const roleId = await findRoleIdByName(context, role)
        const userRoleExistsRes = await userRoleExists(context, {
          userId,
          roleId,
        })
        return userRoleExistsRes
      },
    )
  })
  return rulesObj
}

const rules = {
  ...genericRules(),
  ...typeRules,
}

const permissionMiddleware = shield({
  Query: {
    collections: or(rules.isAdmin, rules.isCollectionOwner),
    collection: or(rules.isAdmin, rules.isCollectionOwner),
    artefacts: or(rules.isUser, rules.isAdmin, rules.isCollectionOwner),
    // collectionArtefacts: or(rules.isAdmin, rules.isCollectionOwner),
    artefact: or(rules.isUser, rules.isAdmin, rules.isCollectionOwner),
  },
  Mutation: {
    createCollection: rules.isAdmin,
    updateCollection: or(rules.isAdmin, rules.isCollectionOwner),
    deleteCollection: or(rules.isAdmin, rules.isCollectionOwner),
    createArtefact: or(rules.isAdmin, rules.isCollectionOwner),
    updateArtefact: or(rules.isAdmin, rules.isCollectionOwner),
    deleteArtefact: or(rules.isAdmin, rules.isCollectionOwner),
    addArtefact: rules.isUser,
    removeArtefact: rules.isUser,
    // Uncomment the following line after assigning at least one admin user
    // assignRole: or(rules.isAdmin, rules.isCollectionOwner),
    createRole: rules.isAdmin,
  },
})

export default permissionMiddleware
