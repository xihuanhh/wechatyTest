const { Wechaty } = require('wechaty')
const { PuppetPadplus } = require('wechaty-puppet-padplus')
const qr = require('qrcode-terminal')


const conf = require('../config')

const puppet = new PuppetPadplus({
  token: conf.padplustoken // <-- place your token
})

const bot = new Wechaty({
  puppet,
})

bot.on('scan', (qrcode) => {
  qr.generate(qrcode, {
    small: true
  })
}).start()

module.exports = bot