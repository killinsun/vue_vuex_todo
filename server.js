const express = require('express')
const serveStatic = require('serve-static')
const port = process.env.PORT || 8080
const app = express()
// eslint-disable-next-line no-path-concat
app.use(serveStatic(__dirname + '/dist'))
app.listen(port)
console.log('express server started at http://localhost:' + port)
