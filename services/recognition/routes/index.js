'use strict'

const Router = require('koa-router')
const router = new Router({
  prefix: '/conversation',
})

const classify = require('../routes/classify.routes')
const user = require('../routes/user.routes')

router.get('/ping', async ctx => ctx.ok('pong'))

router.use('/classification', classify.routes())
router.use('/user', user.routes())

module.exports = router
