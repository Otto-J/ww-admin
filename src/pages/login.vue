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
                  <!-- <a-button status="danger" @click="reg">注册</a-button> -->
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
import http from '@/utils/http'
// import { Cloud } from 'laf-client-sdk'
import { Message } from '@arco-design/web-vue'

defineOptions({
  name: 'PageLogin'
})

// https://admin.webworker.tech/user/login

const loginUrl = '/user/login'
const regUrl = '/user/reg'

const defaultFormModel = () => ({
  username: '',
  password: ''
})
const formModel = ref(defaultFormModel())

// const reg = async () => {
//   http
//     .request({
//       method: 'post',
//       url: regUrl,
//       data: formModel.value
//     })
//     .then(() => {
//       // console.log(2, res)
//       Message.success('注册成功')
//       formModel.value = defaultFormModel()
//     })
//     .catch((e) => {
//       Message.error('注册失败:' + e)
//     })
// }

// const route = useRoute()
const router = useRouter()

const onSubmit = () => {
  console.log(formModel.value)
  http
    .request({
      url: loginUrl,
      method: 'post',
      data: formModel.value
    })
    .then((res) => {
      let _res = res as unknown as { access_token: string; username: string; expired_at: number }
      Message.success('登录成功')
      localStorage.setItem('access_token', _res.access_token)
      localStorage.setItem('username', _res.username)
      localStorage.setItem('expired_at', String(_res.expired_at))

      // router go /
      router.replace('/')
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

<route lang="yaml">
name: PageLogin
meta:
  layout: blank
</route>
