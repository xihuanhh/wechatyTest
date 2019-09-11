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
  await test('contactsNumber', async t => {
    const contacts = await bot.Contact.findAll()
    const personalContacts = contacts.filter(contact => bot.Contact.Type.Personal === contact.type())
    t.same(personalContacts.length, totalContacts + 1, 'personal contacts should be equivalent with your input')
    t.end()
  })
})


