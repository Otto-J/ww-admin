<template>
  <div :class="$style.page">
    <a-layout style="height: 100%">
      <!-- <a-layout-header></a-layout-header> -->
      <a-layout-content class="flex justify-center items-center">
        <div class="w-4/12 mx-auto">
          <a-card title="login" :bordered="false">
            <a-form :model="formModel" @submit="onSubmit">
              <a-form-item field="user" label="账号">
                <a-input v-model="formModel.user" />
              </a-form-item>
              <a-form-item field="password" label="密码">
                <a-input v-model="formModel.password" />
              </a-form-item>
              <a-form-item>
                <a-button type="primary" html-type="submit">登录</a-button>
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

const formModel = ref({
  user: '',
  password: ''
})

const onSubmit = () => {
  console.log(formModel.value)
}
</script>

<style module>
.page {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
}
</style>
