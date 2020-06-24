const authControllers = require('./auth')
const apiControllers = require('./api')

module.exports = {
  auth: authControllers,
  api: apiControllers
}
