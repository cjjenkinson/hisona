'use strict'

const services = require('../services/Recognition')

/**
 * Recognition.js controller
 *
 * @description: A set of functions called "actions" for managing Recognition.
 */

module.exports = {
  /**
   * Classify an uploaded image.
   *
   * @return {Object|Array}
   */

  recogniseArtefactFromUpload: async ctx => {
    const imagePath = ctx.request.body.files.photo.path
    const classifiedPayload = await services.classifyUploadedImage(imagePath)
    return ctx.ok(classifiedPayload)
  },

  findAllClassifiers: async ctx => {
    const classifiers = await services.getClassifiers()
    return ctx.ok(classifiers)
  },
}


