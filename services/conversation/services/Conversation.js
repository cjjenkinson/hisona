'use strict'

/**
 * Conversation.js service
 *
 * @description: A set of functions to handle Conversation controller actions.
 */

const _ = require('lodash')
const fetch = require('node-fetch')
const limdu = require('limdu')

const utils = require('../utils')
const config = require('../config')

module.exports = {

  /**
   * Classify the message and respond
   *
   * @return {Object}
   */

  mapMessageToResponse: async (body) => {
    const { artefact_id, message, context } = utils.parseBody(body)

    const url = `${config.artefactUrlDev}${artefact_id}`
    const response = await fetch(url)
    const artefact = await response.json()

    const curriculum = _.get(artefact, 'curriculum')

    // Base multi-label classifier based on winnow
    const TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
        binaryClassifierType: limdu.classifiers.Winnow.bind(0, {
          retrain_count: 10,
        }),
      },
    )

    // Feature extractors
    const WordExtractor = (input, features) => {
      return input.split(' ').forEach((word) => features[word] = 1)
    }

    // Initialize a classifier
    const intentClassifier = new limdu.classifiers.EnhancedClassifier({
      classifierType: TextClassifier,
      normalizer: limdu.features.LowerCaseNormalizer,
      featureExtractor: WordExtractor,
    })

    // Train the intents
    await intentClassifier.trainBatch(curriculum.intents)

    // Classify the message
    const intent = await intentClassifier.classify(message)

    // If no intent matched fallback to the last context default reply
    if (!intent[0]) {
      const reply = await curriculum.responses
        .filter(response => response.intent === context.last_intent)

      return { message: reply }
    }

    // Map the intent to the reply mesasge
    const reply = await curriculum.responses
      .filter(response => response.intent === intent[0])

    return { message: reply }
  },
}
