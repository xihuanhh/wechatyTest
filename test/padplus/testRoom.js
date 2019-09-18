#!/usr/bin node
const bot = require('../../libs/padplusBot')
const tap = require('tap')
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
    // console.log('contactself', contactSelf)
  })
  .on('ready', async dummy => {
  })
  .on('room-join', async (room, inviteeList, inviter) => {
    await test('******* room-join start ******* ')
    await test('** 联系人是否入群成功 ？**', async t => {
      for (let i of inviteeList) {
        const contact = await room.member(i.payload.name)
        t.notSame(contact, null)
        t.notSame(contact, undefined)
      }
    })

    await test('** 对新入群的人发 英语 **', async t => {
      for (let i of inviteeList) {
        const contact = await room.member(i.payload.name)
        await room.say('hello~ world!', contact)
        await utils.sleep(3000)
      }
    })

    await test('** 对新入群的人发 中文 **', async t => {
      for (let i of inviteeList) {
        const contact = await room.member(i.payload.name)
        await room.say('你好，世界！', contact)
        await utils.sleep(3000)
      }
    })

    await test('** 对新入群的人发 emoji表情 **', async t => {
      for (let i of inviteeList) {
        const contact = await room.member(i.payload.name)
        await room.say('hello, 世界😯️', contact)
        await utils.sleep(3000)
      }
    })

    await test('** 对新入群的发链接 同时 @他 **', async t => {
      await room.say(utils.linkMessage())
      for (let i of inviteeList) {
        const contact = await room.member(i.payload.name)
        await room.say('', contact)
        await utils.sleep(3000)
      }
    })

    await test('** 对新入群的发图片 同时 @他 **', async t => {
      await room.say(utils.imageMessage())
      for (let i of inviteeList) {
        const contact = await room.member(i.payload.name)
        await room.say('', contact)
        await utils.sleep(3000)
      }
    })

    await test('** 对新入群的发文件 同时 @他 **', async t => {
      await room.say(utils.file())
      for (let i of inviteeList) {
        const contact = await room.member(i.payload.name)
        await room.say('', contact)
        await utils.sleep(3000)
      }
    })

    await test('** 对新入群的发小程序卡片 同时 @他 **', async t => {
      await room.say(utils.miniProgramPayload())
      for (let i of inviteeList) {
        const contact = await room.member(i.payload.name)
        await room.say('', contact)
        await utils.sleep(3000)
      }
    })

    await test('******* room-join end ******* ')

    await test('******* room-leave start *******', async t => {
      for (let i of inviteeList) {
        const contact = await room.member(i.payload.name)
        await room.del(contact)
        await room.say(`移除 ${contact.name()}`)
        await utils.sleep(3000)
      }
    })
  })
  .on('room-leave', async (room, leaverList, remover) => {

    await test('** 联系人是否被移除？ **', async t => {
      for (let i of leaverList) {
        const contact = await room.member(i.payload.name)
        t.same(contact, undefined)
        await utils.sleep(3000)
      }
    })

    await test('******* room-leave end *******')
  })
  .on('message', async message => {
    console.log('message', message)
  })
