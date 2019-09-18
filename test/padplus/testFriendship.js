const bot = require('../../libs/padplusBot')
const tap = require('tap')
const { FileBox } = require('file-box')
const _ = require('lodash')
const utils = require('./../../libs/utils')
const test = tap.test

let whoami = null // will be set after login

// TODO: coz no READY event emit from padplus puppet, mannually emit one.
console.log(`
####################### READY EVENT WOULD BE EMITTED AFTER 30 SECONDS ###################
`)
setTimeout(() => {
  bot.emit('ready')
}, 30000)

bot
  .on('login', async contactSelf => {
    console.log('contactself', contactSelf)
  })
  .on('ready', async dummy => {

  })
  .on('friendship', async friendship => {
    const contact = friendship.contact()
    //接受好友请求
    await test('friendshipAccept', async t => await friendship.accept())

    //接受后发消息 (具体每个消息类型再分别做测试)
    await test('BotSayEngTextToContact', async a => await contact.say('hello~ world!'))
    await utils.sleep(3000)

    await test('BotSayChineseTextToContact', async a => await contact.say('你好，世界！'))
    await utils.sleep(3000)

    await test('BotSayEmojiWithTextToContact', async a => await contact.say('hello, 世界😯️'))
    await utils.sleep(3000)

    await test('BotSayLinkToContact', async a => await contact.say(utils.linkMessage()))
    await utils.sleep(3000)

    await test('BotSayImageToContact', async a => await contact.say(utils.imageMessage()))
    await utils.sleep(3000)

  })
  .on('message', async message => {
    console.log('message', message)
  })
