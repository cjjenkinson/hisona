'use strict'

const Router = require('koa-router')
const router = new Router({ prefix: '/conversation' })

const Conversation = require('../controllers/Conversation')

router.get('/ping', async ctx => ctx.ok('pong'))
router.post('/message', Conversation.reply)

module.exports = router
