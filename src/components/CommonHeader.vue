<template>
  <a-row
    class="border-slate-100 border-b-2"
    :class="$style.header"
    style="background-color: var(--color-menu-light-bg)"
    align="center"
  >
    <a-col flex="auto">
      <a-menu mode="horizontal">
        <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
          <div
            :style="{
              width: '80px',
              height: '30px',
              borderRadius: '2px',
              background: 'var(--color-fill-3)',
              cursor: 'text'
            }"
          />
        </a-menu-item>
        <a-menu-item key="1">Home</a-menu-item>
        <a-menu-item key="2">Solution</a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px" class="text-right pr-6">
      <a-dropdown @select="onSelect" position="bl" trigger="hover">
        <a-avatar :size="30">
          <IconUser />
        </a-avatar>
        <template #content>
          <a-doption value="userCenter">个人中心</a-doption>
          <a-doption value="logout">退出登录</a-doption>
        </template>
      </a-dropdown>
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
// import router from '@/router';
import { Message } from '@arco-design/web-vue'
import { IconUser } from '@arco-design/web-vue/es/icon'

defineOptions({
  name: 'CommonHeader'
})

const handleLogout = () => {
  localStorage.removeItem('access_token')
  // remote expired_at username
  localStorage.removeItem('expired_at')
  localStorage.removeItem('username')
}
const router = useRouter()

const onSelect = (val: string | number | Record<string, any> | undefined, e: Event) => {
  console.log(val)
  if (val === 'logout') {
    // 准备退出
    handleLogout()
    Message.success('退出成功！')
    router.push({
      name: 'PageLogin'
    })
  }
}
</script>

<style module>
.header {
  --color-menu-light-bg: #fff;

  /* box-shadow: 0 3px 6px rgba(51, 53, 59, 0.06); */
}
</style>
