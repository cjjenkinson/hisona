'use strict'

const fs = require('fs')
const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3')

/**
 * Recognition.js service
 *
 * @description: A set of functions called "actions" for managing the Recognition service.
 */

const WatsonRecognition = new VisualRecognitionV3({
  version: 'v3',
  api_key: '2270a72b9188e1ea2a824d42e8eca522057a0c6c',
  version_date: '2018-03-19',
})

// TODO: Load from artefact collection model reference e.g UK Public or London Public
const classifierId = 'DefaultCustomModel_1022810496'

module.exports = {
  /**
   * Classify an uploaded image.
   *
   * @return {Object|Array}
   */
  classifyUploadedImage: async imagePath => {
    const parameters = {
      classifier_ids: [classifierId],
      threshold: 0.3,
    }

    const classifyParams = {
      images_file: fs.createReadStream(imagePath),
      parameters: parameters,
    }

    const classLabel = await WatsonRecognition.classify(
      classifyParams,
      (err, response) => {
        if (err) console.log(err)
        else console.log(JSON.stringify(response, null, 2))
      },
    )

    return classLabel
  },

  /**
   * List the classifiers from the Watson model
   *
   * @return {Object|Array}
   */
  getClassifiers: async () => {
    const classifiers = await WatsonRecognition.listClassifiers(
      { verbose: true },
      (err, response) => {
        if (err) console.log(err)
        else console.log(JSON.stringify(response, null, 2))
      },
    )

    return classifiers
  },
}

// async function mapClassToArtefact(ctx) {
//   try {
//     const { body } = ctx.request

//     const data = utils.cleanBody(body)

//     if (!data.images[0].classifiers.length) {
//       throw new Error('The artefact could not be recognised from the image')
//     }

//     const classLabel = data.images[0].classifiers[0].classes[0].class

//     const artefactCollection = await fs.readFileSync(
//       `./mock-data/artefact_collection.json`,
//     )

//     const artefacts = JSON.parse(artefactCollection)

//     const artefactFromClassLabel = artefacts.filter(a => {
//       return a.artefact_id === classLabel
//     })

//     if (!artefactFromClassLabel.length) {
//       throw new Error('There is no artefact that matches the class label')
//     }

//     ctx.ok(artefactFromClassLabel)

//     const status = await db.addArtefact(artefactFromClassLabel[0])
//     console.log(status)
//   } catch (err) {
//     console.log(err)
//     ctx.send(404, { error: err.message })
//   }
// }
