<template>
  <a-layout :class="$style.page" id="layout-default">
    <a-layout-header>
      <CommonHeader />
    </a-layout-header>
    <a-layout-content>
      <a-layout class="h-full flex-nowrap" id="laytout-content">
        <a-layout-sider style="width: 200px" class="border-slate-100 border-r-2 h-full">
          <SideMenu />
        </a-layout-sider>
        <a-layout-content class="h-full p-3">
          <div class="w-full h-full" id="layout-router-view">
            <router-view />
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts" setup>
import CommonHeader from '@/components/header.vue'
import SubMenu from '@/components/side-menu.vue'

defineOptions({
  name: 'LayoutDefault'
})
</script>

<style module>
.page {
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  /* background-image: linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%); */
  --color-menu-light-bg: #fff;
  height: 100vh;
}
</style>
