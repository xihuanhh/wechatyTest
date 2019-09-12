const bot = require('../libs/webBot')
const utils = require('./../libs/utils')
const tap = require('tap')
const _ = require('lodash')
const {FileBox} = require('file-box')
const test = tap.test

const totalContacts = 480
const contactsNameForTest = ['小怪兽', '斩月', '西瓜', 'Agnes']

const INITIAL_TEST_ROOM_NAME = 'AWarmRoom一个温馨的房间'
const ANOTHER_TEST_ROOM_NAME = 'ANewRoomTopic'

let whoami = null // will be set after login

bot
.on('login', async contactSelf => {

  whoami = contactSelf

  await test('contactSelf.avatar', t => contactSelf.avatar())
    
  await test('contactSelf.name', t => {
    t.match(contactSelf.name(), /.*/)
    t.end()
  })

  await test('contactSelf.qrcode', async t => contactSelf.qrcode())
    
})
// .on('ready', async dummy => {

//   let roomForTest

//   const linkMessage = new bot.UrlLink({
//     description : 'WeChat Bot SDK for Individual Account, Powered by TypeScript, Docker, and Love',
//     thumbnailUrl: 'https://avatars0.githubusercontent.com/u/25162437?s=200&v=4',
//     title       : 'Welcome to Wechaty',
//     url         : 'https://github.com/chatie/wechaty',
//   })

//   const imageMessage = FileBox.fromUrl('https://res.wx.qq.com/a/wx_fed/webwx/res/static/css/5af37c4a880a95586cd41c5b251d5562@1x.png')
  
//   const contacts = await bot.Contact.findAll()
//   const personalContacts = contacts.filter(contact => bot.Contact.Type.Personal === contact.type())

//   await test('contactsNumber', async t => {
//     t.same(personalContacts.length, totalContacts + 1, 'personal contacts should be equivalent with your input')
//     t.end()
//   })

//   if (personalContacts.length >= 4) {
//     await test('createRoom', async t => {
//       // const otherContacts = personalContacts.filter(contact => !contact.self())
//       const contactsForRoomCreate = contacts.filter(contact => _.indexOf(contactsNameForTest.slice(0, 2), contact.name()) !== -1)
//       roomForTest = await bot.Room.create(contactsForRoomCreate, INITIAL_TEST_ROOM_NAME)
//       return roomForTest
//     })

//     await test('topicOfCreatedRoom', async t => {
//       const topic = await roomForTest.topic()
//       t.same(topic, INITIAL_TEST_ROOM_NAME)
//     })

//     await utils.sleep(1000)

//     await test('RoomSayEngText', async t => roomForTest.say('hello~ world!'))
    
//     await utils.sleep(3000)
    
//     await test('RoomSayChineseText', async t => roomForTest.say('你好，世界！'))

//     await utils.sleep(3000)

//     await test('RoomSayEmojiWithText', async t => roomForTest.say('hello, 世界😯️'))

//     await utils.sleep(3000)

//     await test('RoomSayLink', t => roomForTest.say(linkMessage))

//     await utils.sleep(3000)

//     await test('RoomSayImage', t => roomForTest.say(imageMessage))

//     await utils.sleep(3000)

//     await test('RoomMemberAll', t => roomForTest.memberAll().then(members => {
//       t.equal(members.length, 3)
//     }))

//     await utils.sleep(3000)

//     await test('RoomAddContact', async t => {
//       const contactForAddInRoom = await bot.Contact.find({name: contactsNameForTest[2]})
//       return roomForTest.add(contactForAddInRoom)
//     })

//     await utils.sleep(3000)

//     await test('RoomSayWithMetion', async t => {
//       const members = await roomForTest.memberAll()
//       const toBeMentioned = members.slice(0, 3)
//       return roomForTest.say(`I mentioned all of you.`, ...toBeMentioned)
//     })

//     await test('RoomDelContact', async t => {
//       const contactForDelInRoom = await bot.Contact.find({name: contactsNameForTest[2]})
//       return roomForTest.del(contactForDelInRoom)
//     })

//     // room.topic()
//     await test('changeRoomTopic', async t => {
//       return roomForTest.topic(ANOTHER_TEST_ROOM_NAME)
//     })

//     await test('roomAnnouncement', async t => {
//       return roomForTest.announce('This is an announcement in our room.')
//     })

//     await test('roomOwner', async t => {
//       const owner = roomForTest.owner()
//       t.same(owner.name(), whoami.name())
//     })

//     await test('roomAvatar', t => roomForTest.avatar())

//     await test('roomHasMember', async t => {
//       const hasMe = await roomForTest.has(whoami)
//       t.same(hasMe, true)
//     })

//     await test('roomMemberAlias', t => roomForTest.alias(whoami))

//   } else {
//     console.log(`
//         your should have at least three contacts for running these test:
//         > create room
//     `)
//   }

// })
.on('message', async message => {
  // console.log(message)
  // console.log(message.from())
  // console.log(message.from().name(), _.indexOf(contactsNameForTest, message.from().name()))
  if (!message.room() && _.indexOf(contactsNameForTest, message.from().name()) !== -1) {
    console.log('----1')
    if (message.type() === bot.Message.Type.Text) {
      console.log('----2', message.type())
      await test('getTextMessage', t => {
        t.match(message.text(), /.*/)
        t.end()
      })
      test('sendingTextMessage', t => message.forward(message.from()))
    } else if (message.type() === bot.Message.Type.Url) {
      test('sendingUrlMessage', t => message.forward(message.from()))
    } else if (message.type() === bot.Message.Type.Video) {
      test('sendingVideoMessage', t => message.forward(message.from()))
    } else if (message.type() === bot.Message.Type.Image) {
      test('sendImageMessage', t => message.forward(message.from()))
    } else if (message.type() === bot.Message.Type.Emoticon) {
      test('sendingEmoticonMessage', t => message.forward(message.from()))
    } else if (message.type() === bot.Message.Type.Contact) {
      test('sendingContactMessage', t => message.forward(message.from()))
    } else if (message.type() === bot.Message.Type.Audio) {
      test('sendingAudioMessage', t => message.forward(message.from()))
    } else if (message.type() === bot.Message.Type.Attachment) {
      test('sendingAttachmentMessage', t => message.forward(message.from()))
    } else {
      //
    }
  }
})


