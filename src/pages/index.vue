<template>
  <div class="w-full rounded-md bg-white h-full flex items-center justify-center">
    <div>❤️ 欢迎登录！</div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

defineOptions({
  name: 'PageIndex'
})

const defaultFormModel = () => ({
  title: '',
  No: 0,
  date: '',
  cover: '',
  publish: true,
  xyz: '',
  apple: '',
  ipfs: '',
  host: [] as string[],
  guest: [] as string[],
  guestIntro: '',
  intro: '',
  guestImage: [] as string[],
  timeline: ''
})
const formModel = ref(defaultFormModel())
</script>

<style module>
.page {
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  /* background-image: linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%); */
  --color-menu-light-bg: #fff;
  height: 100vh;
}
</style>
