<template>
  <a-menu v-model:select-keys="menuSelectKeys" class="h-full" @menu-item-click="onMenuItemClick">
    <a-sub-menu v-for="item of menuData" :key="item.id">
      <template #title> {{ item.title }} </template>
      <a-menu-item
        v-for="i of item.children ?? []"
        :key="i.id"
        @click="$router.push(i.url ?? '')"
        >{{ i.title }}</a-menu-item
      >
    </a-sub-menu>
  </a-menu>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'SideMenu'
})

const menuSelectKeys = ref(['0-1'])

const onMenuItemClick = (key: string) => {
  // console.log(e)
  menuSelectKeys.value = [key]
}

interface MenuItem {
  id: string
  title: string
  url?: string
  children?: MenuItem[]
}
const menuData = ref<MenuItem[]>([])
const menuDataMock = [
  {
    id: '0',
    title: '基础信息维护',
    children: [
      {
        id: '0-1',
        title: '嘉宾信息',
        url: '/baseInfo/host'
      },
      {
        id: '0-2',
        title: '播客列表',
        url: '/baseInfo/podcast'
      },
      {
        id: '0-3',
        title: '文字片段',
        url: '/baseInfo/words'
      }
    ]
  },
  {
    id: '1',
    title: '素材管理',
    children: [
      {
        id: '1-1',
        title: '图片管理',
        url: ''
      },
      {
        id: '1-2',
        title: '音频管理',
        url: ''
      }
    ]
  },
  {
    id: '2',
    title: 'blog',
    children: [
      {
        id: '2-1',
        title: '平台列表',
        url: '/blogs'
      }
    ]
  }
  // {
  //   id: '2',
  //   title: '平台信息维护',
  //   children: [
  //     {
  //       id: '2-1',
  //       title: '平台列表',
  //       url: ''
  //     }
  //   ]
  // }
]
onMounted(() => {
  menuData.value = menuDataMock
})
</script>

<style></style>
