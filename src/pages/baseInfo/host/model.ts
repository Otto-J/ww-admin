// @ts-ignore
import yaml from 'js-yaml'

export const transfromToYaml = (json: any) => {
  // 使用 js-yaml 转成 yaml
  return yaml.dump(json)
}

// 列表页转成复合标准的 json
const temp = {
  _id: '64eb7aa749e97aa67551df1f',
  name: '辛宝Otto',
  avatar: 'http://cdn2.webworker.tech/img/avatar/pic-otto.jpg',
  bio: '儿化音比较牛逼',
  link: 'https://blog.ijust.cc',
  isHost: true,
  wechatId: '',
  isShow: true,
  twitter: 'https://twitter.com/ji3206',
  order: 1
}
export const generateFile = (list: any[]) => {
  const hostList = list.filter((i) => i.isHost)
  const guestList = list.filter((i) => !i.isHost)

  const mock = {
    layout: 'Links',
    title: 'Web Worker 的朋友们',
    links: [
      {
        title: '主播',
        items: [] as any[]
      },
      {
        title: '播客嘉宾',
        items: [] as any[]
      }
    ]
  }

  mock.links[0].items = hostList.map((i) => {
    return {
      sitename: i.name,
      url: i.link ?? '/',
      img: i.avatar,
      desc: i.bio
    }
  })
  mock.links[1].items = guestList.map((i) => {
    return {
      sitename: i.name,
      url: i.link ?? '/',
      img: i.avatar,
      desc: i.bio
    }
  })

  const str = transfromToYaml(mock)
  console.log(str)
  const finalStr = `---\n${str}\n---`
  // 生成 md 文件
  // 使用 blob 转成文件
  const blob = new Blob([finalStr], { type: 'text/plain;charset=utf-8' })
  const a = document.createElement('a')
  a.download = 'friends.md'
  a.href = URL.createObjectURL(blob)
  a.click()
  URL.revokeObjectURL(a.href)
}
