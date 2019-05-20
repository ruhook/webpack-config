const env = process.env.NODE_ENV.trim() // dev or prod
module.exports = require(`./build/webpack.${env}.js`)