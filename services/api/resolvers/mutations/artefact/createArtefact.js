/**
 * artefact.js Mutations
 *
 * @description: A set of GraphQL mutations for managing artefacts.
 */

import UserError from '../../../utils/UserError'
import strings from '../../../utils/strings'
import { getUserId } from '../../../utils/auth'
import images from '../../../config/images'
import initScriptData from './initScriptData'

export default async (root, args, context, info) => {
  const userId = getUserId(context)
  const {
    name,
    collectionId,
    country,
    city,
    address,
    lat,
    lng
  } = args.data

  // TODO: Permissions, create default script,

  const artefactExists = context.db.exists.Artefact({
    name
  }, info)

  if (artefactExists) {
      throw new UserError('This name is already in use, please use a different one')
  }

  const labelName = strings.generateLabelName(name)

  const artefactData = {
    data: {
      name,
      labelName,
      location: {
        create: {
          country,
          city,
          address,
          lat,
          lng,
        }
      },
      avatar: {
        create: { url: images.defaultAvatar }
      },
      collection: { connect: { id: collectionId } },
      script: {
        create: initScriptData
      },
      meta: {
        create: {
          popularity: 0,
          conversationCount: 0,
          recognisedCount: 0,
        }
      },
    },
  }

  return await context.db.mutation.createArtefact(artefactData, info)
};
