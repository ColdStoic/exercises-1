'use strict'
const app = require('./app')
const port = process.env.PORT || app.listen(3000, () =>   console.log(`Server is listening on port ${port}.`))