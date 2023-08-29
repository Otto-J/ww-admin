import { Cloud } from 'laf-client-sdk'
const cloud = new Cloud({
  // 这里 APPID 需要换成对应的 APPID
  baseUrl: 'https://admin.webworker.tech',
  // 这里是访问策略的入口地址，如果没有访问策略可不填
  dbProxyUrl: '/proxy/podcast',
  // 请求时带的 token，可空
  getAccessToken: () => localStorage.getItem('access_token') as string
})

export const db = cloud.database()
