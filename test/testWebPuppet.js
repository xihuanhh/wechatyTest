const bot = require('../libs/webBot')
const tap = require('tap')
const test = tap.test

const totalContacts = 480

bot
.on('login', async contactSelf => {
  await test('contactSelf.avatar', t => contactSelf.avatar())
    
  await test('contactSelf.name', t => {
    t.match(contactSelf.name(), /.*/)
    t.end()
  })

  await test('contactSelf.qrcode', async t => contactSelf.qrcode())
    
})
.on('ready', async dummy => {

  let roomForTest

  const linkMessage = new bot.UrlLink({
    description : 'WeChat Bot SDK for Individual Account, Powered by TypeScript, Docker, and Love',
    thumbnailUrl: 'https://avatars0.githubusercontent.com/u/25162437?s=200&v=4',
    title       : 'Welcome to Wechaty',
    url         : 'https://github.com/chatie/wechaty',
  })
  
  const contacts = await bot.Contact.findAll()
  const personalContacts = contacts.filter(contact => bot.Contact.Type.Personal === contact.type())

  await test('contactsNumber', async t => {
    t.same(personalContacts.length, totalContacts + 1, 'personal contacts should be equivalent with your input')
    t.end()
  })

  if (personalContacts.length >= 3) {
    await test('createRoom', async t => {
      const otherContacts = personalContacts.filter(contact => !contact.self())
      roomForTest = await bot.Room.create([otherContacts[0], otherContacts[1]], 'AWarmRoom一个温馨的房间')
      return roomForTest
    })

    await test('RoomSayText', async t => roomForTest.say('hello~ world!'))

    await test('RoomSayText', async t => roomForTest.say('你好，世界！'))

    await test('RoomSayText', async t => roomForTest.say('hello, 世界😯️'))

    await test('RoomSayLink', t => roomForTest.say(linkMessage))

  } else {
    console.log(`
        your should have at least three contacts for running these test:
        > create room
    `)
  }

})


