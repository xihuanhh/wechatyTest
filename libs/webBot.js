const { Wechaty } = require('wechaty')
const { PuppetPuppeteer } = require('wechaty-puppet-puppeteer')
const qr = require('qrcode-terminal')

const puppet = new PuppetPuppeteer()

const bot = new Wechaty({
  puppet,
})

bot.on('scan', (qrcode) => {
  qr.generate(qrcode, {
    small: true
  })
}).start()

module.exports = bot