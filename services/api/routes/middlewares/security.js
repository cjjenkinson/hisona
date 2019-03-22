/**
 * security.js Middleware
 *
 * @description: A middleware to manage security.
 */

import hpp from 'hpp'
import helmet from 'helmet'

const securityMiddleware = server => {
  server.disable('x-powered-by')
  server.use(hpp())

  // https://helmetjs.github.io/docs/ienoopen/
  server.use(helmet.ieNoOpen())

  // https://helmetjs.github.io/docs/dont-sniff-mimetype/
  server.use(helmet.noSniff())

  // https://helmetjs.github.io/docs/xss-filter/
  server.use(helmet.xssFilter())

  // https://helmetjs.github.io/docs/frameguard/
  server.use(helmet.frameguard('deny'))
}

export default securityMiddleware
