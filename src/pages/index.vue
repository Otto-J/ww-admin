<template>
  <div :class="$style.page">
    <CommonHeader />
    <div style="background-color: var(--color-menu-light-bg)" class="mt-4 mx-auto container p-2">
      body
    </div>
  </div>
</template>
<script lang="ts" setup>
import CommonHeader from '@/components/header.vue'
defineOptions({
  name: 'PageIndex'
})
</script>

<style module>
.page {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  /* background-image: linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%); */
  --color-menu-light-bg: #fff;
}
</style>
