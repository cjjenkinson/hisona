'use strict'

const services = require('../services/Conversation')

/**
 * Conversation.js controller
 *
 * @description: A set of functions called "actions" for managing Conversations.
 */

module.exports = {
  /**
   * Reply to incoming messages.
   *
   * @return {Object|Array}
   */

  reply: async ctx => {
    const replyPayload = await services.mapMessageToResponse(ctx.request.body)
    return ctx.ok(replyPayload)
  },
}
