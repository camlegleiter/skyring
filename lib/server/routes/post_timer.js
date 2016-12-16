'use strict';
const timer = require('../../timer')
/**
 * @apiDescription Create a new time on the cluster
 * @apiGroup timer
 * @apiName create_timer
 * @api {post} /timer Create a new timer
 * @apiVersion 1.0.0 
 * @apiParam {Number} timeout the time in miliseconds before the timer executes
 * @apiParam {String} data a data payload to include with the timer when it executes
 * @apiParam {Object} callback
 * @apiParam {String} callback.transport The delivery transport to use when executing the timer
 * @apiParam {String} callback.method The method of delivery the tranport should use
 * @apiParam {String} callback.uri A full uri the transport should send data to
 * @apiExample {curl} curl:
 *  curl -XPOST -H "Content-Type: application/json" http://localhost:3000/timer  -d '{
 *  "timeout": 3000,
 *  "data": "{\"name\":\"Bill\"}",
 *  "callback": {
 *    "method": "post",
 *    "uri": "http://mydomain.name/timer/callback",
 *    "tranport:"http"
 *  }
 *  @apiExample {js} Node.js:
 *  const http = require('http')
 *  const options = {
 *     hostname: 'localhost',
 *     port: 3000,
 *     path: '/timer',
 *     method: 'POST',
 *     headers: {
 *       'Content-Type': 'application/json',
 *       'Content-Length': Buffer.byteLength(postData)
 *     }
 *   };
 *  const data = JSON.stringify({
 *    timeout: 5000,
 *    data: {foo: 'bar', bar: 'baz'},
 *    callback: {
 *      transport: 'http',
 *      method: 'post',
 *      uri: 'http://mydomain.name/timer/callback
 *    }
 *  })
 *  const req = http.request(options, (res) => {
 *    let data = '';
 *    res.on('data', (chunk) => {
 *      data += chunk;
 *    });
 *
 *    res.on('end', () => {
 *      // done
 *    });
 *  })
 *  req.write(data);
 *  req.end();
 **/
module.exports = {
  path: '/timer'
, method: 'POST'
, middleware: [require('./middleware/proxy')]
, handler: (req, res, cb) => {
		const id = req.$.headers['x-timer-id']
		timer.create(id, req.$.body, (err) => {
			if (err) return cb(err)
			res.$.set('location', `/timer/${id}`)
			cb()
		})
	}
}