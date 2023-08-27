<template>
  <div :class="$style.page">
    <a-layout style="height: 100%">
      <!-- <a-layout-header></a-layout-header> -->
      <a-layout-content class="flex justify-center items-center">
        <div class="w-4/12 mx-auto">
          <a-card title="login" :bordered="false">
            <a-form :model="formModel" @submit="onSubmit">
              <a-form-item field="user" label="账号">
                <a-input v-model="formModel.username" />
              </a-form-item>
              <a-form-item field="password" label="密码">
                <a-input v-model="formModel.password" type="password" />
              </a-form-item>
              <a-form-item>
                <a-space>
                  <a-button type="primary" html-type="submit">登录</a-button>
                  <a-button status="danger" @click="reg">注册</a-button>
                </a-space>
              </a-form-item>
            </a-form>
          </a-card>
        </div>
      </a-layout-content>
      <a-layout-footer>
        <div class="text-white font-bold">footer</div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'
import { Cloud } from 'laf-client-sdk'
import { Message } from '@arco-design/web-vue'

defineOptions({
  name: 'PageLogin'
})

const http = axios.create({
  baseURL: 'https://admin.webworker.tech'
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
http.interceptors.response.use((res) => {
  if (res.status === 200) {
    // 进一步 res.data.error
    if (res.data.error) {
      return Promise.reject(res.data.error)
    } else {
      return res.data
    }
  }
  return res
})

// https://admin.webworker.tech/user/login

const loginUrl = '/user/login'
const regUrl = '/user/reg'

// const cloud = new Cloud({
//   // 这里 APPID 需要换成对应的 APPID
//   baseUrl: 'https://admin.webworker.tech',
//   // 这里是访问策略的入口地址，如果没有访问策略可不填
//   dbProxyUrl: '/proxy/podcast',
//   // 请求时带的 token，可空
//   getAccessToken: () => localStorage.getItem('access_token') as string
// })

const defaultFormModel = () => ({
  username: '',
  password: ''
})
const formModel = ref(defaultFormModel())

const reg = async () => {
  http
    .request({
      method: 'post',
      url: regUrl,
      data: formModel.value
    })
    .then(() => {
      // console.log(2, res)
      Message.success('注册成功')
      formModel.value = defaultFormModel()
    })
    .catch((e) => {
      Message.error('注册失败:' + e)
    })
}

const onSubmit = () => {
  console.log(formModel.value)
  http
    .request({
      url: loginUrl,
      method: 'post',
      data: formModel.value
    })
    .then((res) => {
      let _res = res as unknown as { access_token: string }
      Message.success('登录成功')
      localStorage.setItem('access_token', _res.access_token)
    })
    .catch((e) => {
      Message.error('登录失败:' + e)
    })
}
</script>

<style module>
.page {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
}
</style>
