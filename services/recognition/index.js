require('dotenv').config();

const Koa = require('koa');
const helmet = require('koa-helmet');
const cors = require('koa-cors');
const logger = require('koa-logger');
const serve = require('koa-static');
const koaBody = require('koa-body');
const respond = require('koa-respond');

const app = new Koa();
const config = require('../config');
const router = require('./routes');

app
	.use(logger())
	.use(helmet())
	.use(cors())
	.use(async (ctx, next) => {
		try {
			await next();
		} catch (e) {
			console.error(e);
			ctx.status = 500;
			if (e.message) {
				ctx.body = {
					errors: [e.message]
				};
			}
		}
	})
	.use(
		koaBody({
			formidable: {
				uploadDir: './temp-images',
				keepExtensions: true
			},
			multipart: true,
			urlencoded: true
		})
	)
	.use(respond());

app.use(router.routes());
app.use(router.allowedMethods());


const server = app.listen(config.port).on('error', err => {
	console.error(err);
});

console.log(`Server now listening on: ${config.port}`);

