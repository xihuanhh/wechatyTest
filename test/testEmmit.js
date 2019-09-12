const bot = require('../libs/webBot')

bot.on('ready', ready => {
  console.log('i am ready')
})

setTimeout(()=>{
  bot.emit('ready')
}, 3000)