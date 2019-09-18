const { MiniProgram, UrlLink } = require('wechaty')
const { FileBox } = require('file-box')
const path = require('path')

module.exports = {
  sleep: (ms) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, ms)
    })
  },
  miniProgramPayload: () => {
    return new MiniProgram({
      username: 'gh_beaec24a0c9d',
      appid: '',
      title: 'DNA LobbyHobby',
      pagepath: 'pages/vip-index/vip-index.html',
      description: 'DNA LobbyHobby',
      thumbnailurl: '30580201000451304f0201000204a897175902033d11fd0204b1e2e26502045d6df318042a777875706c6f61645f777869645f72686c6675676d373276667431323231335f313536373438363734340204010400030201000400',               //optional
    })
  },
  linkMessage: () => {
    return new UrlLink({
      description: 'WeChat Bot SDK for Individual Account, Powered by TypeScript, Docker, and Love',
      thumbnailUrl: 'https://avatars0.githubusercontent.com/u/25162437?s=200&v=4',
      title: 'Welcome to Wechaty',
      url: 'https://github.com/chatie/wechaty',
    })
  },

  imageMessage: () => {
    return FileBox.fromUrl('https://res.wx.qq.com/a/wx_fed/webwx/res/static/css/5af37c4a880a95586cd41c5b251d5562@1x.png')
  },

  file: () => {
    return FileBox.fromFile(path.resolve(__dirname,'..','testCase','接口2.txt'))
  }

}
