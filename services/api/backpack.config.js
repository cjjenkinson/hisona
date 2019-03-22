const path = require('path')
const debug = require('debug')('build:backpack')

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = [`./index.js`]
    config.output.path = path.join(process.cwd(), `build-api`);
    return config
  },
}
