<template>
  <Editor
    mode="auto"
    :value="props.text"
    :preview-debounce="300"
    :locale="zhHans"
    :plugins="plugins"
    class="self-md-editor"
    @change="handleChange"
    :upload-images="uploadImages"
  />
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
import http from '@/utils/http'
import { AvatarGroup, Message } from '@arco-design/web-vue'

defineOptions({
  name: 'MDEditor'
})

const props = withDefaults(
  defineProps<{
    text: string
  }>(),
  {
    text: ''
  }
)

const uploadImages = (fileList: File[]) => {
  console.log(fileList[0], 43)
  const [file] = fileList
  if (AvatarGroup.size >= 1024 * 1024 * 2) {
    Message.error('文件过大')
    return
  }
  let param = new FormData() // 创建form对象
  param.append('file', file)
  return http
    .post('/upload-file', param, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      console.log(65, res)
      return [
        {
          url: (res as any).url,
          alt: 'alt',
          title: 'title'
        }
      ]
    })
}

const emit = defineEmits<{
  'update:text': [value: string]
}>()

const plugins = [
  gfm(),
  frontmatter(),
  gemoji(),
  highlight(),
  breaks()
  // Add more plugins here
]
const handleChange = (e: any) => {
  emit('update:text', e)
}
</script>

<style>
.self-md-editor .bytemd {
  height: 100%;
}
</style>
