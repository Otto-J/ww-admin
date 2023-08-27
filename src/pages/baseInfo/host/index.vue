<template>
  <div class="w-full" style="height: 500px; display: block">
    <Editor
      mode="split"
      v-model:value="value"
      :preview-debounce="300"
      :locale="zhHans"
      :plugins="plugins"
      class="h-full"
      @change="handleChange"
    />
    <!-- <Viewer :value="value" :plugins="plugins" /> -->
  </div>
</template>
<script lang="ts" setup>
// @ts-ignore
import { Editor } from '@bytemd/vue-next'
import frontmatter from '@bytemd/plugin-frontmatter'
import gfm from '@bytemd/plugin-gfm'
import gemoji from '@bytemd/plugin-gemoji'
import highlight from '@bytemd/plugin-highlight'
import zhHans from 'bytemd/locales/zh_Hans.json'
import breaks from '@bytemd/plugin-breaks'
import '@/assets/md2.css'
// import '@/assets/md.css'
import 'highlight.js/styles/rainbow.css'
import 'bytemd/dist/index.css'

defineOptions({
  name: 'PageHost'
})

const value = ref('')
const plugins = [
  gfm(),
  frontmatter(),
  gemoji(),
  highlight({}),
  breaks()
  // Add more plugins here
]
const handleChange = (e: any) => {
  console.log(e)
  value.value = e
}
</script>

<route lang="json">
{
  "name": "PageHost",
  "meta": {
    "requiresAuth": false,
    "title": "嘉宾信息"
  }
}
</route>

<style>
.bytemd {
  height: 100%;
}
</style>
